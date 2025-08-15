#!/usr/bin/env python3
"""
Backend API Testing for Strike Cheats Website
Tests all API endpoints at http://localhost:5000
"""

import requests
import sys
import json
from datetime import datetime

class StrikeCheatsAPITester:
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED {details}")
        else:
            print(f"❌ {name} - FAILED {details}")

    def test_health_check(self):
        """Test health check endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/health")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                required_fields = ['status', 'timestamp', 'uptime', 'memory']
                has_all_fields = all(field in data for field in required_fields)
                success = has_all_fields and data['status'] == 'healthy'
                details = f"Status: {data.get('status', 'unknown')}"
            else:
                details = f"Status Code: {response.status_code}"
                
            self.log_test("Health Check", success, details)
            return success
        except Exception as e:
            self.log_test("Health Check", False, f"Error: {str(e)}")
            return False

    def test_get_all_services(self):
        """Test getting all services"""
        try:
            response = self.session.get(f"{self.base_url}/api/services")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = isinstance(data, list) and len(data) > 0
                
                if success:
                    # Verify service structure
                    service = data[0]
                    required_fields = ['id', 'title', 'description', 'price', 'imageUrl', 'category', 'features']
                    has_all_fields = all(field in service for field in required_fields)
                    success = has_all_fields
                    details = f"Found {len(data)} services"
                else:
                    details = "No services found or invalid format"
            else:
                details = f"Status Code: {response.status_code}"
                
            self.log_test("Get All Services", success, details)
            return success, data if success else []
        except Exception as e:
            self.log_test("Get All Services", False, f"Error: {str(e)}")
            return False, []

    def test_get_categories(self):
        """Test getting service categories"""
        try:
            response = self.session.get(f"{self.base_url}/api/categories")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = 'categories' in data and isinstance(data['categories'], list)
                details = f"Found {len(data.get('categories', []))} categories: {', '.join(data.get('categories', []))}"
            else:
                details = f"Status Code: {response.status_code}"
                
            self.log_test("Get Categories", success, details)
            return success
        except Exception as e:
            self.log_test("Get Categories", False, f"Error: {str(e)}")
            return False

    def test_get_single_service(self, service_id):
        """Test getting a single service by ID"""
        try:
            response = self.session.get(f"{self.base_url}/api/services/{service_id}")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                required_fields = ['id', 'title', 'description', 'price', 'imageUrl', 'category', 'features']
                has_all_fields = all(field in data for field in required_fields)
                success = has_all_fields and data['id'] == service_id
                details = f"Service: {data.get('title', 'Unknown')}"
            else:
                details = f"Status Code: {response.status_code}"
                
            self.log_test("Get Single Service", success, details)
            return success
        except Exception as e:
            self.log_test("Get Single Service", False, f"Error: {str(e)}")
            return False

    def test_search_services(self):
        """Test service search functionality"""
        search_terms = ["aimbot", "ESP", "mobile"]
        
        for term in search_terms:
            try:
                response = self.session.get(f"{self.base_url}/api/services", params={'search': term})
                success = response.status_code == 200
                
                if success:
                    data = response.json()
                    # Handle both array and object response formats
                    services = data['services'] if isinstance(data, dict) and 'services' in data else data
                    success = isinstance(services, list)
                    
                    if success and len(services) > 0:
                        # Verify search results contain the search term
                        found_term = any(
                            term.lower() in service.get('title', '').lower() or
                            term.lower() in service.get('description', '').lower() or
                            any(term.lower() in feature.lower() for feature in service.get('features', []))
                            for service in services
                        )
                        details = f"Found {len(services)} results for '{term}'"
                    else:
                        details = f"No results for '{term}'"
                else:
                    details = f"Status Code: {response.status_code}"
                    
                self.log_test(f"Search Services ('{term}')", success, details)
            except Exception as e:
                self.log_test(f"Search Services ('{term}')", False, f"Error: {str(e)}")

    def test_filter_by_category(self):
        """Test category filtering"""
        categories = ["Aimbot", "ESP", "Mobile", "Premium"]
        
        for category in categories:
            try:
                response = self.session.get(f"{self.base_url}/api/services", params={'category': category})
                success = response.status_code == 200
                
                if success:
                    data = response.json()
                    # Handle both array and object response formats
                    services = data['services'] if isinstance(data, dict) and 'services' in data else data
                    success = isinstance(services, list)
                    
                    if success and len(services) > 0:
                        # Verify all services belong to the requested category
                        correct_category = all(
                            service.get('category', '').lower() == category.lower()
                            for service in services
                        )
                        details = f"Found {len(services)} services in '{category}' category"
                        success = correct_category
                    else:
                        details = f"No services in '{category}' category"
                else:
                    details = f"Status Code: {response.status_code}"
                    
                self.log_test(f"Filter by Category ('{category}')", success, details)
            except Exception as e:
                self.log_test(f"Filter by Category ('{category}')", False, f"Error: {str(e)}")

    def test_get_stats(self):
        """Test getting service statistics"""
        try:
            response = self.session.get(f"{self.base_url}/api/stats")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                required_fields = ['totalProducts', 'categories', 'averagePrice', 'priceRange', 'badgeDistribution']
                has_all_fields = all(field in data for field in required_fields)
                success = has_all_fields
                
                if success:
                    details = f"Total Products: {data['totalProducts']}, Categories: {data['categories']}"
                else:
                    details = "Missing required fields in stats response"
            else:
                details = f"Status Code: {response.status_code}"
                
            self.log_test("Get Statistics", success, details)
            return success
        except Exception as e:
            self.log_test("Get Statistics", False, f"Error: {str(e)}")
            return False

    def test_contact_form(self):
        """Test contact form submission"""
        try:
            contact_data = {
                "name": "Test User",
                "email": "test@example.com",
                "message": "This is a test message",
                "service": "Test Service"
            }
            
            response = self.session.post(f"{self.base_url}/api/contact", json=contact_data)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get('success') == True and 'reference' in data
                details = f"Reference: {data.get('reference', 'N/A')}"
            else:
                details = f"Status Code: {response.status_code}"
                
            self.log_test("Contact Form Submission", success, details)
            return success
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Error: {str(e)}")
            return False

    def test_featured_services(self):
        """Test getting featured services"""
        try:
            response = self.session.get(f"{self.base_url}/api/services/featured")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = isinstance(data, list)
                
                if success and len(data) > 0:
                    # Verify featured services have appropriate badges
                    featured_badges = ['Popular', 'VIP', 'Hot']
                    has_featured_badges = all(
                        service.get('badge') in featured_badges
                        for service in data
                    )
                    details = f"Found {len(data)} featured services"
                    success = has_featured_badges
                else:
                    details = "No featured services found"
            else:
                details = f"Status Code: {response.status_code}"
                
            self.log_test("Get Featured Services", success, details)
            return success
        except Exception as e:
            self.log_test("Get Featured Services", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Strike Cheats API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 50)
        
        # Test health check first
        if not self.test_health_check():
            print("❌ Health check failed - server may not be running")
            return False
        
        # Get services for further testing
        services_success, services = self.test_get_all_services()
        
        # Test other endpoints
        self.test_get_categories()
        self.test_get_stats()
        self.test_featured_services()
        self.test_contact_form()
        
        # Test with actual service data if available
        if services_success and services:
            # Test single service retrieval
            first_service_id = services[0]['id']
            self.test_get_single_service(first_service_id)
        
        # Test search and filtering
        self.test_search_services()
        self.test_filter_by_category()
        
        # Print summary
        print("=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! API is working correctly.")
            return True
        else:
            failed_tests = self.tests_run - self.tests_passed
            print(f"⚠️  {failed_tests} test(s) failed. Check the details above.")
            return False

def main():
    """Main test execution"""
    tester = StrikeCheatsAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())