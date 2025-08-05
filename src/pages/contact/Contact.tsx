import { useForm } from "react-hook-form";
import { useState } from "react";
import { backendApi } from "../../api.ts";
import type { ContactData } from "../../model/ContactData.ts";

type ContactProps = {
    data?: Partial<ContactData>;
}

type Contact = ContactData & { id?: number };

export function Contact({ data = {} }: ContactProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Contact>({
        defaultValues: { ...data, id: data?.id }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (formData: Contact) => {
        setIsSubmitting(true);
        try {
            formData.id = formData.id ?? Date.now();

            const response = await backendApi.post('/contacts/save', formData);
            console.log('ContactData saved:', response.data);

            setShowSuccess(true);
            reset();

            // Hide success message after 5 seconds
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error('Error saving contact:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 px-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-6">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Get in <span className="text-orange-600">Touch</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have a question about our books, need assistance with your order, or want to share feedback?
                        We'd love to hear from you and help you on your literary journey.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-xl">
                                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Phone</h4>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                        <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM-6PM EST</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-xl">
                                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Email</h4>
                                        <p className="text-gray-600">support@litshelf.com</p>
                                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-xl">
                                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Address</h4>
                                        <p className="text-gray-600">123 Book Street</p>
                                        <p className="text-gray-600">Literary District, NY 10001</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-xl">
                                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Follow Us</h4>
                                        <div className="flex space-x-3 mt-2">
                                            <a href="#" className="text-orange-600 hover:text-orange-700 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                </svg>
                                            </a>
                                            <a href="#" className="text-orange-600 hover:text-orange-700 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.1L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                                                </svg>
                                            </a>
                                            <a href="#" className="text-orange-600 hover:text-orange-700 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Quick Links */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-4">Quick Help</h3>
                            <div className="space-y-3">
                                <a href="#" className="block text-orange-100 hover:text-white transition-colors text-sm">
                                    📚 How to place an order?
                                </a>
                                <a href="#" className="block text-orange-100 hover:text-white transition-colors text-sm">
                                    🚚 Shipping & delivery info
                                </a>
                                <a href="#" className="block text-orange-100 hover:text-white transition-colors text-sm">
                                    💳 Payment methods accepted
                                </a>
                                <a href="#" className="block text-orange-100 hover:text-white transition-colors text-sm">
                                    🔄 Return & refund policy
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                            {showSuccess && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                        <p className="text-green-700 font-medium">Message sent successfully! We'll get back to you soon.</p>
                                    </div>
                                </div>
                            )}

                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                                                errors.name
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-200 focus:border-orange-500'
                                            }`}
                                            placeholder="Enter your full name"
                                            {...register('name', {
                                                required: 'Name is required',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Name must be at least 2 characters'
                                                }
                                            })}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                </svg>
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                                                errors.email
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-200 focus:border-orange-500'
                                            }`}
                                            placeholder="Enter your email address"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                </svg>
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                                                errors.phone
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-200 focus:border-orange-500'
                                            }`}
                                            placeholder="Enter your phone number"
                                            {...register('phone', {
                                                pattern: {
                                                    value: /^\+?[\d\s-]{0,15}$/,
                                                    message: 'Invalid phone number'
                                                }
                                            })}
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                </svg>
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                                                errors.subject
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-200 focus:border-orange-500'
                                            }`}
                                            placeholder="What's this about?"
                                            {...register('subject', {
                                                required: 'Subject is required',
                                                pattern: {
                                                    value: /^.{10,30}$/,
                                                    message: 'Subject must be between 10 and 30 characters'
                                                }
                                            })}
                                        />
                                        {errors.subject && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                </svg>
                                                {errors.subject.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        rows={6}
                                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none resize-none ${
                                            errors.message
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-gray-200 focus:border-orange-500'
                                        }`}
                                        placeholder="Tell us more about your inquiry..."
                                        {...register('message', {
                                            required: 'Message is required',
                                            minLength: {
                                                value: 10,
                                                message: 'Message must be at least 10 characters'
                                            }
                                        })}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                            </svg>
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending Message...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                            </svg>
                                            Send Message
                                        </div>
                                    )}
                                </button>

                                <p className="text-sm text-gray-500 text-center">
                                    We typically respond within <span className="font-semibold text-orange-600">24 hours</span> during business days.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}