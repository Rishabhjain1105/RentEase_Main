import React from 'react';
import AllPropCardContainer from '../../components/Cards/AllPropertiescards/AllPropCardContainer';
import HeaderLandingPage from '../../components/Nav/HeaderLandingPage';
import { Home, BarChart2, Users, FileText, ShieldCheck, CalendarCheck } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/70 shadow-lg">
                <HeaderLandingPage />
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-blue-100 to-black/10 ">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black/90">Simplify Property Management</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-black/50 ">
                        RentEase streamlines your rental operations with powerful tools for owners, managers, and tenants.
                    </p>
                    
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-8 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-600">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-500" size={24} />
                            <span>Secure Platform</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="text-blue-500" size={24} />
                            <span>10,000+ Happy Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarCheck className="text-purple-500" size={24} />
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-20 px-4  bg-gradient-to-b from-black/10 to-blue-100">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to RentEase</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            RentEase is a comprehensive property management platform designed to simplify the rental process for everyone involved. 
                            Our cloud-based solution helps property owners manage their portfolios, enables managers to streamline operations, 
                            and empowers tenants with self-service tools.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-blue-500">
                            <Home className="text-blue-500 mb-4" size={32} />
                            <h3 className="text-xl font-semibold mb-3">Property Management</h3>
                            <p className="text-gray-600">
                                Easily add, organize, and track all your properties in one place with detailed analytics and reporting.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-purple-500">
                            <Users className="text-purple-500 mb-4" size={32} />
                            <h3 className="text-xl font-semibold mb-3">Tenant Portal</h3>
                            <p className="text-gray-600">
                                Give tenants access to pay rent, submit maintenance requests, and view lease details through their personal dashboard.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-green-500">
                            <BarChart2 className="text-green-500 mb-4" size={32} />
                            <h3 className="text-xl font-semibold mb-3">Financial Tools</h3>
                            <p className="text-gray-600">
                                Automate rent collection, generate invoices, and track expenses with our integrated financial management system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Properties Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Properties</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Browse our featured properties or list your own to find the perfect match between owners and tenants.
                        </p>
                    </div>
                    <AllPropCardContainer />
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="flex mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6">
                                "RentEase has completely transformed how I manage my 15 rental properties. The automation features save me 20+ hours per month!"
                            </p>
                            <div className="flex items-center">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                                    JS
                                </div>
                                <div>
                                    <h4 className="font-semibold">John Smith</h4>
                                    <p className="text-gray-500 text-sm">Property Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="flex mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6">
                                "As a tenant, I love the transparency and ease of use. Paying rent and submitting maintenance requests has never been easier."
                            </p>
                            <div className="flex items-center">
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4">
                                    SA
                                </div>
                                <div>
                                    <h4 className="font-semibold">Sarah Adams</h4>
                                    <p className="text-gray-500 text-sm">Tenant</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="flex mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6">
                                "The reporting tools give me insights I never had before about my properties' performance. Game changer for my business."
                            </p>
                            <div className="flex items-center">
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4">
                                    MR
                                </div>
                                <div>
                                    <h4 className="font-semibold">Michael Rodriguez</h4>
                                    <p className="text-gray-500 text-sm">Property Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Rental Experience?</h2>
                    <p className="text-xl mb-8">
                        Join thousands of satisfied users who are managing their properties with ease.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all">
                            Start Free Trial
                        </button>
                        <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
                            Schedule Demo
                        </button>
                    </div>
                    <p className="mt-6 text-blue-100">
                        No credit card required • 14-day free trial • Cancel anytime
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">RentEase</h3>
                        <p className="text-gray-400">
                            Making property management simple, efficient, and stress-free for everyone.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Features</a></li>
                            <li><a href="#" className="hover:text-white">Pricing</a></li>
                            <li><a href="#" className="hover:text-white">API</a></li>
                            <li><a href="#" className="hover:text-white">Integrations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Documentation</a></li>
                            <li><a href="#" className="hover:text-white">Guides</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">About</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Privacy</a></li>
                            <li><a href="#" className="hover:text-white">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>© 2023 RentEase. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;