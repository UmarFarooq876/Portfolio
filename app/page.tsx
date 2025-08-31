'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Form submission failed');
      }

      setTimeout(() => setSubmitStatus('idle'), 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 via-indigo-900/30 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/10 backdrop-blur-xl z-50 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Umar Farooq
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`relative px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 group overflow-hidden ${
                      activeSection === section
                        ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                    {activeSection !== section && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/umar.jpg" 
                    alt="Umar Farooq" 
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Hi, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse">
                Umar Farooq
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6 font-light">
              Full Stack Developer
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['HTML', 'JavaScript', 'React.js', 'NextJS', 'Tailwind CSS'].map((tech, index) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-sm"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Ask me about <span className="text-purple-400 font-semibold">Web Development</span> &{' '}
              <span className="text-pink-400 font-semibold">Frontend Frameworks</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="group relative px-8 py-3 border-2 border-purple-400 text-purple-400 font-bold rounded-xl hover:bg-purple-400 hover:text-white transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </button>
            </div>
            {/* Social Media Links */}
            <div className="flex justify-center space-x-6">
              {[
                { href: "https://linkedin.com/in/umar-farooq", icon: "linkedin", color: "hover:text-blue-400" },
                { href: "https://github.com/umar-farooq", icon: "github", color: "hover:text-white" },
                { href: "https://x.com/umar_farooq", icon: "twitter", color: "hover:text-blue-400" }
              ].map((social, index) => (
                <a 
                  key={social.icon}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-125 hover:rotate-12`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                    <span>{social.icon}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-16 bg-black/20 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto rounded-full shadow-lg shadow-purple-500/25"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Who I Am</h3>
              <div className="space-y-4">
                <p className="text-base text-gray-300 leading-relaxed">
  I&apos;m <span className="text-purple-400 font-semibold">Umar Farooq</span>, a passionate full-stack developer specializing in modern web technologies. 
  I love creating beautiful, functional, and user-centered digital experiences using 
  cutting-edge frameworks and tools.
</p>

                <p className="text-base text-gray-300 leading-relaxed">
                  My expertise lies in frontend development with <span className="text-blue-400 font-semibold">React.js</span> and <span className="text-green-400 font-semibold">NextJS</span>, creating responsive 
                  designs with <span className="text-cyan-400 font-semibold">Tailwind CSS</span>, and building robust web applications with <span className="text-orange-400 font-semibold">HTML</span> and <span className="text-yellow-400 font-semibold">JavaScript</span>. 
                  I'm always eager to learn new technologies and contribute to innovative projects.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { text: 'React.js Expert', bg: 'bg-blue-600/20', textColor: 'text-blue-400', border: 'border-blue-400/30' },
                  { text: 'NextJS Developer', bg: 'bg-green-600/20', textColor: 'text-green-400', border: 'border-green-400/30' },
                  { text: 'Tailwind CSS', bg: 'bg-cyan-600/20', textColor: 'text-cyan-400', border: 'border-cyan-400/30' }
                ].map((badge, index) => (
                  <div key={index} className={`${badge.bg} ${badge.border} px-4 py-2 rounded-lg border backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                    <span className={`${badge.textColor} font-semibold text-sm`}>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Frontend Development', percentage: 95, color: 'from-blue-400 to-cyan-400' },
                { label: 'React.js & NextJS', percentage: 90, color: 'from-purple-400 to-pink-400' },
                { label: 'Tailwind CSS', percentage: 85, color: 'from-cyan-400 to-blue-400' },
                { label: 'JavaScript & HTML', percentage: 90, color: 'from-orange-400 to-red-400' }
              ].map((skill, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold text-sm">{skill.label}</span>
                    <span className="text-purple-400 font-bold text-base">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-2000 ease-out shadow-lg`}
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto rounded-full shadow-lg shadow-purple-500/25"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'HTML', icon: '🌐', color: 'from-orange-400 to-red-500', delay: '0ms' },
              { name: 'JavaScript', icon: '📜', color: 'from-yellow-400 to-orange-500', delay: '100ms' },
              { name: 'React.js', icon: '⚛️', color: 'from-blue-400 to-cyan-400', delay: '200ms' },
              { name: 'NextJS', icon: '⚡', color: 'from-black to-gray-800', delay: '300ms' },
              { name: 'Tailwind CSS', icon: '🎨', color: 'from-cyan-400 to-blue-500', delay: '400ms' },
              { name: 'CSS', icon: '💎', color: 'from-blue-500 to-indigo-600', delay: '500ms' },
              { name: 'Git', icon: '📚', color: 'from-orange-500 to-red-600', delay: '600ms' },
              { name: 'Responsive Design', icon: '📱', color: 'from-green-400 to-teal-500', delay: '700ms' }
            ].map((skill, index) => (
              <div key={index} className="group" style={{ animationDelay: skill.delay }}>
                <div className={`bg-gradient-to-br ${skill.color} p-6 rounded-xl text-center transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-purple-500/25 hover:rotate-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-500">{skill.icon}</div>
                    <h3 className="text-white font-bold text-base">{skill.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-black/20 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto rounded-full shadow-lg shadow-purple-500/25"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {[
    {
      title: 'Non Profit Organization Website',
      description: 'A comprehensive website for a non-profit organization with donation system, volunteer management, and event coordination features',
      image: '/yado.jpg',
      tags: ['React', 'Next.js', 'Tailwind CSS'],
      link: '#',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: 'Accessible Website App',
      description: 'A fully accessible website application designed specifically for people with disabilities, featuring screen reader support, keyboard navigation, and high contrast modes',
      image: '/caripd.jpg',
      tags: ['React', 'Accessibility', 'WCAG Guidelines'],
      link: '#',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'ConnectPro Service Booking Platform',
      description: 'A comprehensive service booking platform connecting service providers with customers, featuring real-time booking, payment integration, and review system',
      image: '/connectpro.jpg',
      tags: ['Next.js', 'Payment API', 'Real-time'],
      link: '#',
      gradient: 'from-purple-500 to-pink-500'
    }
  ].map((project, index) => (
    <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 border border-white/10">
      <div className="p-6">
        <div className={`w-full h-32 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">{project.title}</h3>
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full border border-purple-400/30 backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm">
          View Project
        </button>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto rounded-full shadow-lg shadow-purple-500/25"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
             <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s Work Together</h3>
              <p className="text-base text-gray-300 leading-relaxed">
  I&apos;m always interested in hearing about new projects and opportunities. 
  Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
</p>
              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: 'imumar837@gmail.com', bg: 'bg-purple-600/20', border: 'border-purple-400/30' },
                  { icon: '💬', label: 'WhatsApp', value: '0312 9424445', bg: 'bg-green-600/20', border: 'border-green-400/30' }
                ].map((contact, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-4 ${contact.bg} ${contact.border} rounded-xl border backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="text-xl">{contact.icon}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base">{contact.label}</p>
                      <p className="text-gray-300 text-sm">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2 text-base">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm text-sm"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 text-base">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm text-sm"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 text-base">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm resize-none text-sm"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-400 text-center mt-4">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center mt-4">Message sent successfully</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-base">
            © 2024 <span className="text-purple-400 font-semibold">Umar Farooq</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
