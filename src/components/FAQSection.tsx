import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How long does it take to receive my photos and videos?",
    answer: "We deliver photos in 24 hours, videos in 48 hours, and 3D tours in 72 hours. Our fast turnaround helps you keep your listings moving quickly in the competitive real estate market."
  },
  {
    question: "How do I book a session with 2818 Studios Media?",
    answer: "You can book through our website contact form, call us directly at (703) 582-2541, or message us via WhatsApp. We'll confirm all details and schedule your session quickly."
  },
  {
    question: "Do I need to be present during the photo/video session?",
    answer: "No, you don't need to be present during the session. Our professional team can handle everything independently. Just ensure we have access to the property and any specific instructions."
  },
  {
    question: "Do you offer packages for agents with multiple listings?",
    answer: "Yes! We offer custom packages and volume discounts for real estate agents with multiple properties. Contact us to discuss pricing for recurring services and build a long-term partnership."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve the entire Washington D.C. metropolitan area, including Maryland and Virginia. Our base is in Hyattsville, but we travel throughout the DMV region for our clients."
  },
  {
    question: "What makes 2818 Studios different from other media companies?",
    answer: "We're a distinctively Christian company that aims to honor our clients in both our products and how we treat them. We combine professional excellence with biblical values of integrity, respect, and ethical business practices."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-dark-fg mb-8">
            Frequently Asked Questions
          </h2>
          <p className="text-xl lg:text-2xl text-dark-fg/80 leading-relaxed">
            Quick answers to common questions about our services, process, and delivery times.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-dark-fg/20 rounded-lg mb-4 overflow-hidden transition-all duration-300 hover:shadow-elegant"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg lg:text-xl font-semibold text-dark-fg pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-primary flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-8 py-6 bg-gray-50 border-t border-dark-fg/10">
                  <p className="text-dark-fg/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-dark-fg/80 mb-6">
            Have a different question? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+17035822541"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
            >
              Call Us: (703) 582-2541
            </a>
            <a 
              href="https://wa.me/17035822541"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}