import { createComponent } from './componentRegistry';
import type { SitePage } from './siteStorage';

export type TemplateCategory = 'saas' | 'portfolio' | 'business' | 'restaurant' | 'wellness' | 'fitness' | 'travel' | 'health' | 'education' | 'realestate' | 'event' | 'fashion' | 'hotel' | 'nonprofit' | 'agency' | 'techlanding' | 'foodbev';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  icon: string;
  thumbnail?: string;
  getComponents: () => any[];
  getPages?: () => SitePage[];
}

// Helper to generate default sub-pages for any template
function generateDefaultPages(brand: string, colors: { bg: string; text: string; accent: string; surface?: string }): SitePage[] {
  return [
    {
      name: 'Features',
      components: [
        createComponent('navbar', { brand, links: ['Home', 'Features', 'Pricing', 'Contact'], bgColor: colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('hero', { heading: `${brand} Features`, subheading: 'Everything you need to succeed, all in one platform.', buttonText: 'Get Started', bgColor: colors.bg, textColor: '#FFFFFF', accentColor: colors.accent }),
        createComponent('features', { heading: 'Core Features', items: [{ title: 'Lightning Fast', desc: 'Optimized for speed and performance' }, { title: 'Secure by Default', desc: 'Enterprise-grade security built in' }, { title: 'Easy Integration', desc: 'Connect with your favorite tools' }, { title: 'Analytics', desc: 'Real-time insights and reporting' }, { title: 'Collaboration', desc: 'Team features for better workflows' }, { title: '24/7 Support', desc: 'We\'re always here to help' }], bgColor: colors.surface || colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('image', { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop', alt: 'Features dashboard', width: '100%', borderRadius: '12px' }),
        createComponent('testimonial', { quote: '"This product transformed how our team works. The features are exactly what we needed."', author: 'Alex Johnson', role: 'Product Manager', bgColor: colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('cta', { heading: 'Ready to Try?', subheading: 'Start your free trial today.', buttonText: 'Start Free', bgColor: colors.bg, textColor: '#FFFFFF', accentColor: colors.accent }),
        createComponent('footer', { brand, copyright: `© 2026 ${brand}. All rights reserved.`, bgColor: colors.bg, textColor: '#888888', accentColor: colors.accent }),
      ],
    },
    {
      name: 'Pricing',
      components: [
        createComponent('navbar', { brand, links: ['Home', 'Features', 'Pricing', 'Contact'], bgColor: colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('hero', { heading: 'Simple, Transparent Pricing', subheading: 'No hidden fees. No surprises. Choose the plan that fits your needs.', buttonText: '', bgColor: colors.bg, textColor: '#FFFFFF', accentColor: colors.accent }),
        createComponent('pricing', { heading: 'Choose Your Plan', plans: [{ name: 'Starter', price: '$9/mo', features: ['Core features', '1 user', 'Email support', '1GB storage'] }, { name: 'Professional', price: '$29/mo', features: ['All features', '5 users', 'Priority support', '10GB storage', 'API access'], highlighted: true }, { name: 'Enterprise', price: '$99/mo', features: ['Unlimited features', 'Unlimited users', '24/7 support', '100GB storage', 'Custom integrations', 'SLA'] }], bgColor: colors.surface || colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('features', { heading: 'All Plans Include', items: [{ title: 'Free Updates', desc: 'Always get the latest features' }, { title: 'SSL Security', desc: 'Your data is always encrypted' }, { title: 'Uptime SLA', desc: '99.9% guaranteed uptime' }], bgColor: colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('cta', { heading: 'Need a Custom Plan?', subheading: 'Contact us for enterprise pricing and custom solutions.', buttonText: 'Contact Sales', bgColor: colors.bg, textColor: '#FFFFFF', accentColor: colors.accent }),
        createComponent('footer', { brand, copyright: `© 2026 ${brand}. All rights reserved.`, bgColor: colors.bg, textColor: '#888888', accentColor: colors.accent }),
      ],
    },
    {
      name: 'Blog',
      components: [
        createComponent('navbar', { brand, links: ['Home', 'Features', 'Pricing', 'Blog'], bgColor: colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('hero', { heading: `${brand} Blog`, subheading: 'Insights, tutorials, and updates from our team.', buttonText: '', bgColor: colors.bg, textColor: '#FFFFFF', accentColor: colors.accent, paddingY: '60px' }),
        createComponent('features', { heading: 'Latest Posts', items: [{ title: 'Getting Started Guide', desc: 'Learn how to set up your account and start using our platform in minutes.' }, { title: '10 Tips for Productivity', desc: 'Boost your workflow with these expert tips from our power users.' }, { title: 'Product Update: v2.0', desc: 'Exciting new features including AI assistant, dark mode, and more.' }, { title: 'Customer Success Story', desc: 'How Company X increased their revenue by 300% using our platform.' }, { title: 'Best Practices', desc: 'Industry best practices for getting the most out of your tools.' }, { title: 'Community Spotlight', desc: 'Highlighting amazing projects built by our community members.' }], bgColor: colors.surface || colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('newsletter', { heading: 'Subscribe to Our Newsletter', placeholder: 'Enter your email', buttonText: 'Subscribe', buttonColor: colors.accent, bgColor: colors.bg, textColor: colors.text }),
        createComponent('footer', { brand, copyright: `© 2026 ${brand}. All rights reserved.`, bgColor: colors.bg, textColor: '#888888', accentColor: colors.accent }),
      ],
    },
    {
      name: 'Contact',
      components: [
        createComponent('navbar', { brand, links: ['Home', 'Features', 'Pricing', 'Contact'], bgColor: colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('hero', { heading: 'Get in Touch', subheading: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.', buttonText: '', bgColor: colors.bg, textColor: '#FFFFFF', accentColor: colors.accent, paddingY: '60px' }),
        createComponent('form', { fields: ['Full Name', 'Email Address', 'Subject', 'Message'], buttonText: 'Send Message', buttonColor: colors.accent, bgColor: colors.surface || colors.bg, textColor: colors.text }),
        createComponent('stats', { items: [{ value: '📧', label: 'hello@' + brand.toLowerCase().replace(/\s+/g, '') + '.com' }, { value: '📞', label: '+1 (555) 123-4567' }, { value: '📍', label: 'San Francisco, CA' }], bgColor: colors.bg, textColor: colors.text, accentColor: colors.accent }),
        createComponent('footer', { brand, copyright: `© 2026 ${brand}. All rights reserved.`, bgColor: colors.bg, textColor: '#888888', accentColor: colors.accent }),
      ],
    },
  ];
}

// ─── SAAS TEMPLATES (25) ─────────────────────────────────
const saasTemplates: Template[] = [
  {
    id: 'saas-ai-writer', name: 'AI Writing Tool', description: 'AI-powered content generation platform',
    category: 'saas', icon: 'Sparkles',
    getComponents: () => [
      createComponent('navbar', { brand: 'WriteAI', links: ['Features', 'Pricing', 'Blog', 'Login'], bgColor: '#0A0A0F', textColor: '#E0E0E0', accentColor: '#8B5CF6' }),
      createComponent('hero', { heading: 'Write 10x Faster with AI', subheading: 'Generate blog posts, emails, and marketing copy in seconds. Powered by GPT-4 and fine-tuned for your brand voice.', buttonText: 'Try Free', bgColor: '#0A0A0F', textColor: '#FFFFFF', accentColor: '#8B5CF6' }),
      createComponent('stats', { items: [{ value: '2M+', label: 'Words Generated' }, { value: '50K+', label: 'Active Users' }, { value: '4.9★', label: 'Rating' }], bgColor: '#0F0F18', textColor: '#E0E0E0', accentColor: '#8B5CF6' }),
      createComponent('features', { heading: 'Supercharge Your Writing', items: [{ title: 'Blog Generator', desc: 'Full articles from a single prompt' }, { title: 'Email Composer', desc: 'Professional emails in your tone' }, { title: 'SEO Optimizer', desc: 'Rank higher with AI-driven content' }, { title: 'Brand Voice', desc: 'Train AI on your unique style' }, { title: '30+ Languages', desc: 'Write in any language instantly' }, { title: 'Plagiarism Free', desc: '100% original content guaranteed' }], bgColor: '#111118', textColor: '#E0E0E0', accentColor: '#8B5CF6' }),
      createComponent('pricing', { heading: 'Simple Pricing', plans: [{ name: 'Starter', price: '$19/mo', features: ['10K words/month', '5 projects', 'Email support'] }, { name: 'Pro', price: '$49/mo', features: ['Unlimited words', '50 projects', 'Priority support', 'API access'], highlighted: true }, { name: 'Team', price: '$99/mo', features: ['Everything in Pro', '10 seats', 'Custom training', 'Dedicated manager'] }], bgColor: '#0F0F18', textColor: '#E0E0E0', accentColor: '#8B5CF6' }),
      createComponent('testimonial', { quote: '"WriteAI saved our content team 20 hours per week. The quality is indistinguishable from human writing."', author: 'Sarah Chen', role: 'Head of Content at ScaleUp', bgColor: '#111118', textColor: '#E0E0E0', accentColor: '#8B5CF6' }),
      createComponent('cta', { heading: 'Start Writing Smarter', subheading: 'Free trial. No credit card required.', buttonText: 'Get Started Free', bgColor: '#0A0A0F', textColor: '#FFFFFF', accentColor: '#8B5CF6' }),
      createComponent('footer', { brand: 'WriteAI', copyright: '© 2026 WriteAI. All rights reserved.', bgColor: '#050508', textColor: '#888888', accentColor: '#8B5CF6' }),
    ],
  },
  {
    id: 'saas-crm', name: 'CRM Platform', description: 'Customer relationship management dashboard',
    category: 'saas', icon: 'Users',
    getComponents: () => [
      createComponent('navbar', { brand: 'RelateIQ', links: ['Product', 'Solutions', 'Pricing', 'Demo'], bgColor: '#0B1120', textColor: '#DBEAFE', accentColor: '#3B82F6' }),
      createComponent('hero', { heading: 'The CRM That Sells For You', subheading: 'AI-powered pipeline management, automated follow-ups, and predictive analytics. Close deals 3x faster.', buttonText: 'Book a Demo', bgColor: '#0B1120', textColor: '#FFFFFF', accentColor: '#3B82F6' }),
      createComponent('stats', { items: [{ value: '$2.1B', label: 'Revenue Tracked' }, { value: '15K+', label: 'Sales Teams' }, { value: '340%', label: 'Avg ROI' }], bgColor: '#0E1528', textColor: '#DBEAFE', accentColor: '#3B82F6' }),
      createComponent('features', { heading: 'Everything Your Sales Team Needs', items: [{ title: 'Smart Pipeline', desc: 'AI-scored leads and deal forecasting' }, { title: 'Email Sequences', desc: 'Automated multi-touch campaigns' }, { title: 'Meeting Scheduler', desc: 'One-click calendar booking' }, { title: 'Revenue Analytics', desc: 'Real-time dashboards and reports' }, { title: 'Team Collaboration', desc: 'Shared notes, tasks and contacts' }, { title: 'Integrations', desc: '200+ app integrations built-in' }], bgColor: '#111827', textColor: '#DBEAFE', accentColor: '#3B82F6' }),
      createComponent('testimonial', { quote: '"RelateIQ increased our close rate by 45% in the first quarter. The AI recommendations are scary accurate."', author: 'Marcus Webb', role: 'VP Sales at CloudFirst', bgColor: '#0E1528', textColor: '#DBEAFE', accentColor: '#3B82F6' }),
      createComponent('pricing', { heading: 'Plans for Every Team', plans: [{ name: 'Growth', price: '$29/user', features: ['Contact management', 'Email tracking', 'Basic reports'] }, { name: 'Business', price: '$59/user', features: ['AI scoring', 'Sequences', 'Advanced analytics', 'API'], highlighted: true }, { name: 'Enterprise', price: 'Custom', features: ['Unlimited everything', 'SSO & SAML', 'Dedicated CSM'] }], bgColor: '#111827', textColor: '#DBEAFE', accentColor: '#3B82F6' }),
      createComponent('cta', { heading: 'See RelateIQ in Action', subheading: '14-day free trial. Setup in 5 minutes.', buttonText: 'Start Free Trial', bgColor: '#0B1120', textColor: '#FFFFFF', accentColor: '#3B82F6' }),
      createComponent('footer', { brand: 'RelateIQ', copyright: '© 2026 RelateIQ Inc.', bgColor: '#070D18', textColor: '#6B7280', accentColor: '#3B82F6' }),
    ],
  },
  {
    id: 'saas-analytics', name: 'Analytics Dashboard', description: 'Real-time data analytics platform',
    category: 'saas', icon: 'BarChart3',
    getComponents: () => [
      createComponent('navbar', { brand: 'DataPulse', links: ['Features', 'Integrations', 'Pricing', 'Docs'], bgColor: '#0B1519', textColor: '#CFFAFE', accentColor: '#06B6D4' }),
      createComponent('hero', { heading: 'Analytics That Actually Matter', subheading: 'Real-time dashboards, custom reports, and AI-powered insights. Make data-driven decisions in seconds.', buttonText: 'Start Free', bgColor: '#0B1519', textColor: '#FFFFFF', accentColor: '#06B6D4' }),
      createComponent('features', { heading: 'Powerful Analytics Suite', items: [{ title: 'Real-Time Data', desc: 'Live dashboards updating every second' }, { title: 'Custom Reports', desc: 'Drag-and-drop report builder' }, { title: 'AI Insights', desc: 'Automated anomaly detection' }, { title: 'Data Warehouse', desc: 'Centralize all your data sources' }], bgColor: '#0F1D23', textColor: '#CFFAFE', accentColor: '#06B6D4' }),
      createComponent('stats', { items: [{ value: '1B+', label: 'Events/Day' }, { value: '<100ms', label: 'Query Time' }, { value: '99.99%', label: 'Uptime' }], bgColor: '#0B1519', textColor: '#CFFAFE', accentColor: '#06B6D4' }),
      createComponent('pricing', { heading: 'Scale As You Grow', plans: [{ name: 'Free', price: '$0', features: ['100K events/mo', '3 dashboards', '7-day retention'] }, { name: 'Pro', price: '$79/mo', features: ['10M events/mo', 'Unlimited dashboards', '1-year retention', 'API'], highlighted: true }, { name: 'Scale', price: '$299/mo', features: ['Unlimited events', 'Custom retention', 'SSO', 'SLA'] }], bgColor: '#0F1D23', textColor: '#CFFAFE', accentColor: '#06B6D4' }),
      createComponent('cta', { heading: 'Start Analyzing Today', subheading: 'Free tier available. No credit card needed.', buttonText: 'Get Started', bgColor: '#0B1519', textColor: '#FFFFFF', accentColor: '#06B6D4' }),
      createComponent('footer', { brand: 'DataPulse', copyright: '© 2026 DataPulse Analytics.', bgColor: '#070F12', textColor: '#6B8A93', accentColor: '#06B6D4' }),
    ],
  },
  {
    id: 'saas-video', name: 'Video Platform', description: 'Video hosting and streaming service',
    category: 'saas', icon: 'Video',
    getComponents: () => [
      createComponent('navbar', { brand: 'StreamVault', links: ['Features', 'Pricing', 'Enterprise', 'Login'], bgColor: '#1A0B14', textColor: '#FCE7F3', accentColor: '#EC4899' }),
      createComponent('hero', { heading: 'Professional Video Hosting', subheading: 'Upload, transcode, and deliver video at scale. Built for creators, teams, and enterprises.', buttonText: 'Upload First Video', bgColor: '#1A0B14', textColor: '#FFFFFF', accentColor: '#EC4899' }),
      createComponent('features', { heading: 'Video Infrastructure', items: [{ title: '4K Transcoding', desc: 'Automatic quality optimization' }, { title: 'Global CDN', desc: 'Fast delivery to 190+ countries' }, { title: 'Analytics', desc: 'Viewer engagement metrics' }, { title: 'Chapters & Captions', desc: 'AI-generated subtitles' }, { title: 'Embed Anywhere', desc: 'Customizable player widget' }, { title: 'Live Streaming', desc: 'Low-latency live broadcasts' }], bgColor: '#25101E', textColor: '#FCE7F3', accentColor: '#EC4899' }),
      createComponent('stats', { items: [{ value: '50M', label: 'Videos Hosted' }, { value: '200+', label: 'Countries' }, { value: '99.99%', label: 'Uptime' }], bgColor: '#1A0B14', textColor: '#FCE7F3', accentColor: '#EC4899' }),
      createComponent('testimonial', { quote: '"StreamVault replaced our entire video infrastructure. Buffering dropped to zero and our viewers love it."', author: 'Jamie Rodriguez', role: 'CTO at EduStream', bgColor: '#25101E', textColor: '#FCE7F3', accentColor: '#EC4899' }),
      createComponent('cta', { heading: 'Ready to Stream?', subheading: '100GB free. No credit card required.', buttonText: 'Start Streaming', bgColor: '#1A0B14', textColor: '#FFFFFF', accentColor: '#EC4899' }),
      createComponent('footer', { brand: 'StreamVault', copyright: '© 2026 StreamVault Inc.', bgColor: '#10060C', textColor: '#8B6B7A', accentColor: '#EC4899' }),
    ],
  },
  {
    id: 'saas-elearning', name: 'E-Learning', description: 'Online course platform',
    category: 'saas', icon: 'GraduationCap',
    getComponents: () => [
      createComponent('navbar', { brand: 'LearnHub', links: ['Courses', 'For Business', 'Pricing', 'Login'], bgColor: '#0B1207', textColor: '#ECFCCB', accentColor: '#84CC16' }),
      createComponent('hero', { heading: 'Learn Anything, Anywhere', subheading: 'Access 5,000+ courses from world-class instructors. Master new skills at your own pace.', buttonText: 'Explore Courses', bgColor: '#0B1207', textColor: '#FFFFFF', accentColor: '#84CC16' }),
      createComponent('stats', { items: [{ value: '5K+', label: 'Courses' }, { value: '1M+', label: 'Students' }, { value: '200+', label: 'Instructors' }], bgColor: '#141E0D', textColor: '#ECFCCB', accentColor: '#84CC16' }),
      createComponent('features', { heading: 'Why Learn With Us', items: [{ title: 'Self-Paced', desc: 'Learn on your schedule' }, { title: 'Certificates', desc: 'Industry-recognized credentials' }, { title: 'Live Mentoring', desc: 'Weekly Q&A with instructors' }, { title: 'Projects', desc: 'Hands-on portfolio projects' }], bgColor: '#141E0D', textColor: '#ECFCCB', accentColor: '#84CC16' }),
      createComponent('pricing', { heading: 'Invest In Yourself', plans: [{ name: 'Free', price: '$0', features: ['5 free courses', 'Community access', 'Basic certificates'] }, { name: 'Pro', price: '$29/mo', features: ['All courses', 'Premium certificates', 'Mentoring', 'Projects'], highlighted: true }, { name: 'Teams', price: '$99/mo', features: ['50 seats', 'Admin dashboard', 'Custom tracks', 'Analytics'] }], bgColor: '#0B1207', textColor: '#ECFCCB', accentColor: '#84CC16' }),
      createComponent('testimonial', { quote: '"LearnHub helped me switch careers into data science. The courses are incredibly well-structured."', author: 'Priya Sharma', role: 'Data Scientist at Meta', bgColor: '#141E0D', textColor: '#ECFCCB', accentColor: '#84CC16' }),
      createComponent('cta', { heading: 'Start Learning Today', subheading: 'Join 1M+ students worldwide.', buttonText: 'Sign Up Free', bgColor: '#0B1207', textColor: '#FFFFFF', accentColor: '#84CC16' }),
      createComponent('footer', { brand: 'LearnHub', copyright: '© 2026 LearnHub Education.', bgColor: '#060B04', textColor: '#6B7A5C', accentColor: '#84CC16' }),
    ],
  },
  {
    id: 'saas-hr', name: 'HR Platform', description: 'Human resources management system',
    category: 'saas', icon: 'Users',
    getComponents: () => [
      createComponent('navbar', { brand: 'PeopleOS', links: ['Product', 'Solutions', 'Pricing', 'Login'], bgColor: '#1A110B', textColor: '#FFEDD5', accentColor: '#F97316' }),
      createComponent('hero', { heading: 'HR That Humans Love', subheading: 'Onboarding, payroll, benefits, and performance — all in one beautiful platform your team will actually use.', buttonText: 'See Demo', bgColor: '#1A110B', textColor: '#FFFFFF', accentColor: '#F97316' }),
      createComponent('features', { heading: 'Complete HR Suite', items: [{ title: 'Smart Onboarding', desc: 'Automate the entire new-hire journey' }, { title: 'Payroll', desc: 'Run payroll in 50+ countries' }, { title: 'Time Off', desc: 'PTO tracking and approvals' }, { title: 'Performance', desc: '360° reviews and goals' }, { title: 'Benefits', desc: 'Health, dental, and perks' }, { title: 'People Analytics', desc: 'Retention and engagement insights' }], bgColor: '#251A10', textColor: '#FFEDD5', accentColor: '#F97316' }),
      createComponent('stats', { items: [{ value: '8K+', label: 'Companies' }, { value: '500K', label: 'Employees Managed' }, { value: '50+', label: 'Countries' }], bgColor: '#1A110B', textColor: '#FFEDD5', accentColor: '#F97316' }),
      createComponent('testimonial', { quote: '"PeopleOS replaced 5 different tools. Our HR team finally has everything in one place."', author: 'Lisa Park', role: 'CHRO at Finova', bgColor: '#251A10', textColor: '#FFEDD5', accentColor: '#F97316' }),
      createComponent('cta', { heading: 'Modernize Your HR', subheading: 'Free for up to 10 employees.', buttonText: 'Get Started', bgColor: '#1A110B', textColor: '#FFFFFF', accentColor: '#F97316' }),
      createComponent('footer', { brand: 'PeopleOS', copyright: '© 2026 PeopleOS Inc.', bgColor: '#100A06', textColor: '#8B7A6B', accentColor: '#F97316' }),
    ],
  },
  {
    id: 'saas-marketing', name: 'Marketing Automation', description: 'Email and marketing automation',
    category: 'saas', icon: 'Megaphone',
    getComponents: () => [
      createComponent('navbar', { brand: 'GrowthKit', links: ['Features', 'Templates', 'Pricing', 'Login'], bgColor: '#0F0F1F', textColor: '#E0E7FF', accentColor: '#6366F1' }),
      createComponent('hero', { heading: 'Marketing on Autopilot', subheading: 'Email sequences, landing pages, and analytics that drive conversions. Set it up once, grow forever.', buttonText: 'Start Free Trial', bgColor: '#0F0F1F', textColor: '#FFFFFF', accentColor: '#6366F1' }),
      createComponent('features', { heading: 'All-In-One Marketing', items: [{ title: 'Email Campaigns', desc: 'Drag-and-drop email builder' }, { title: 'Landing Pages', desc: 'High-converting page templates' }, { title: 'A/B Testing', desc: 'Optimize everything automatically' }, { title: 'CRM Sync', desc: 'Integrates with your sales tools' }], bgColor: '#16162B', textColor: '#E0E7FF', accentColor: '#6366F1' }),
      createComponent('stats', { items: [{ value: '25K+', label: 'Marketers' }, { value: '1B+', label: 'Emails Sent' }, { value: '3.2x', label: 'Avg ROI' }], bgColor: '#0F0F1F', textColor: '#E0E7FF', accentColor: '#6366F1' }),
      createComponent('pricing', { heading: 'Grow Without Limits', plans: [{ name: 'Starter', price: '$19/mo', features: ['1K contacts', '5K emails/mo', 'Landing pages'] }, { name: 'Growth', price: '$59/mo', features: ['10K contacts', 'Unlimited emails', 'A/B testing', 'Automations'], highlighted: true }, { name: 'Pro', price: '$149/mo', features: ['100K contacts', 'Priority support', 'Custom domain', 'API'] }], bgColor: '#16162B', textColor: '#E0E7FF', accentColor: '#6366F1' }),
      createComponent('cta', { heading: 'Automate Your Growth', subheading: '14-day free trial. Cancel anytime.', buttonText: 'Try GrowthKit', bgColor: '#0F0F1F', textColor: '#FFFFFF', accentColor: '#6366F1' }),
      createComponent('footer', { brand: 'GrowthKit', copyright: '© 2026 GrowthKit.', bgColor: '#08081A', textColor: '#6B6B8A', accentColor: '#6366F1' }),
    ],
  },
  {
    id: 'saas-invoicing', name: 'Invoicing App', description: 'Smart invoicing and billing',
    category: 'saas', icon: 'DollarSign',
    getComponents: () => [
      createComponent('navbar', { brand: 'BillFlow', links: ['Features', 'Pricing', 'Resources', 'Login'], bgColor: '#FFFFFF', textColor: '#1E293B', accentColor: '#111827' }),
      createComponent('hero', { heading: 'Invoicing Made Effortless', subheading: 'Create professional invoices in seconds. Get paid faster with automated reminders and online payments.', buttonText: 'Create First Invoice', bgColor: '#FFFFFF', textColor: '#111827', accentColor: '#111827' }),
      createComponent('features', { heading: 'Smart Billing Features', items: [{ title: 'One-Click Invoices', desc: 'Beautiful invoices in seconds' }, { title: 'Online Payments', desc: 'Accept cards and bank transfers' }, { title: 'Auto Reminders', desc: 'Never chase payments again' }, { title: 'Expense Tracking', desc: 'Track and categorize expenses' }], bgColor: '#F9FAFB', textColor: '#1E293B', accentColor: '#111827' }),
      createComponent('stats', { items: [{ value: '$500M+', label: 'Invoiced' }, { value: '30K+', label: 'Businesses' }, { value: '2 days', label: 'Avg Payment Time' }], bgColor: '#FFFFFF', textColor: '#1E293B', accentColor: '#111827' }),
      createComponent('pricing', { heading: 'Fair, Simple Pricing', plans: [{ name: 'Freelancer', price: '$0', features: ['5 invoices/mo', 'Online payments', 'Basic reports'] }, { name: 'Business', price: '$15/mo', features: ['Unlimited invoices', 'Recurring billing', 'Expense tracking', 'Team access'], highlighted: true }, { name: 'Enterprise', price: '$49/mo', features: ['All features', 'Multi-currency', 'API access', 'Priority support'] }], bgColor: '#F9FAFB', textColor: '#1E293B', accentColor: '#111827' }),
      createComponent('cta', { heading: 'Get Paid Faster', subheading: 'Free forever for freelancers.', buttonText: 'Start Free', bgColor: '#FFFFFF', textColor: '#111827', accentColor: '#111827' }),
      createComponent('footer', { brand: 'BillFlow', copyright: '© 2026 BillFlow Inc.', bgColor: '#F1F5F9', textColor: '#6B7280', accentColor: '#111827' }),
    ],
  },
  {
    id: 'saas-support', name: 'Customer Support', description: 'Help desk and ticketing system',
    category: 'saas', icon: 'MessageSquare',
    getComponents: () => [
      createComponent('navbar', { brand: 'HelpDesk Pro', links: ['Features', 'Pricing', 'Customers', 'Login'], bgColor: '#13111C', textColor: '#EDE9FE', accentColor: '#8B5CF6' }),
      createComponent('hero', { heading: 'Support That Scales', subheading: 'AI-powered help desk with live chat, ticket management, and a self-service knowledge base.', buttonText: 'Try Free', bgColor: '#13111C', textColor: '#FFFFFF', accentColor: '#8B5CF6' }),
      createComponent('features', { heading: 'Complete Support Stack', items: [{ title: 'Live Chat', desc: 'Real-time customer messaging' }, { title: 'Ticket System', desc: 'Organize and prioritize requests' }, { title: 'Knowledge Base', desc: 'Self-service help articles' }, { title: 'AI Copilot', desc: 'Auto-suggest responses' }, { title: 'SLA Management', desc: 'Track response and resolution times' }, { title: 'Reporting', desc: 'Customer satisfaction analytics' }], bgColor: '#1C1929', textColor: '#EDE9FE', accentColor: '#8B5CF6' }),
      createComponent('stats', { items: [{ value: '12K+', label: 'Support Teams' }, { value: '50M+', label: 'Tickets Resolved' }, { value: '94%', label: 'CSAT Score' }], bgColor: '#13111C', textColor: '#EDE9FE', accentColor: '#8B5CF6' }),
      createComponent('cta', { heading: 'Delight Your Customers', subheading: 'Free for small teams. Scale as you grow.', buttonText: 'Get Started', bgColor: '#13111C', textColor: '#FFFFFF', accentColor: '#8B5CF6' }),
      createComponent('footer', { brand: 'HelpDesk Pro', copyright: '© 2026 HelpDesk Pro.', bgColor: '#0B0A12', textColor: '#6B6880', accentColor: '#8B5CF6' }),
    ],
  },
  {
    id: 'saas-ecommerce', name: 'E-Commerce Builder', description: 'Online store platform',
    category: 'saas', icon: 'ShoppingCart',
    getComponents: () => [
      createComponent('navbar', { brand: 'Shopmatic', links: ['Features', 'Themes', 'Pricing', 'Login'], bgColor: '#050F0A', textColor: '#DCFCE7', accentColor: '#22C55E' }),
      createComponent('hero', { heading: 'Launch Your Store Today', subheading: 'Beautiful online stores with built-in payments, inventory, and shipping. No coding needed.', buttonText: 'Start Selling', bgColor: '#050F0A', textColor: '#FFFFFF', accentColor: '#22C55E' }),
      createComponent('features', { heading: 'Everything You Need to Sell', items: [{ title: 'Product Pages', desc: 'Beautiful, high-converting layouts' }, { title: 'Payments', desc: 'Stripe, PayPal, Apple Pay' }, { title: 'Inventory', desc: 'Automated stock management' }, { title: 'Shipping', desc: 'Real-time rates and tracking' }], bgColor: '#0A1A12', textColor: '#DCFCE7', accentColor: '#22C55E' }),
      createComponent('stats', { items: [{ value: '$1B+', label: 'Sales Processed' }, { value: '80K+', label: 'Stores' }, { value: '195', label: 'Countries' }], bgColor: '#050F0A', textColor: '#DCFCE7', accentColor: '#22C55E' }),
      createComponent('pricing', { heading: 'Start Free, Scale Fast', plans: [{ name: 'Basic', price: '$29/mo', features: ['Unlimited products', 'Online payments', '2% transaction fee'] }, { name: 'Pro', price: '$79/mo', features: ['Everything in Basic', '0.5% fee', 'Gift cards', 'Reports'], highlighted: true }, { name: 'Plus', price: '$299/mo', features: ['0% fee', 'Custom checkout', 'B2B wholesale', 'API'] }], bgColor: '#0A1A12', textColor: '#DCFCE7', accentColor: '#22C55E' }),
      createComponent('cta', { heading: 'Open Your Store', subheading: '14-day free trial on all plans.', buttonText: 'Start Free Trial', bgColor: '#050F0A', textColor: '#FFFFFF', accentColor: '#22C55E' }),
      createComponent('footer', { brand: 'Shopmatic', copyright: '© 2026 Shopmatic Inc.', bgColor: '#030A06', textColor: '#4A6B55', accentColor: '#22C55E' }),
    ],
  },
  {
    id: 'saas-social', name: 'Social Media Manager', description: 'Social scheduling and analytics',
    category: 'saas', icon: 'Share2',
    getComponents: () => [
      createComponent('navbar', { brand: 'SocialPilot', links: ['Features', 'Pricing', 'Blog', 'Login'], bgColor: '#FFF1F2', textColor: '#881337', accentColor: '#F43F5E' }),
      createComponent('hero', { heading: 'Master Social Media', subheading: 'Schedule posts, track analytics, and grow your audience across all platforms from one dashboard.', buttonText: 'Start Free', bgColor: '#FFF1F2', textColor: '#881337', accentColor: '#F43F5E' }),
      createComponent('features', { heading: 'Social Made Simple', items: [{ title: 'Multi-Platform', desc: 'Instagram, Twitter, LinkedIn, TikTok' }, { title: 'Smart Scheduling', desc: 'AI-powered best time to post' }, { title: 'Analytics', desc: 'Cross-platform performance metrics' }, { title: 'Content Calendar', desc: 'Visual planning and collaboration' }], bgColor: '#FFE4E6', textColor: '#881337', accentColor: '#F43F5E' }),
      createComponent('stats', { items: [{ value: '100K+', label: 'Brands' }, { value: '5B+', label: 'Posts Scheduled' }, { value: '250%', label: 'Avg Growth' }], bgColor: '#FFF1F2', textColor: '#881337', accentColor: '#F43F5E' }),
      createComponent('cta', { heading: 'Grow Your Brand', subheading: 'Free plan available for up to 3 accounts.', buttonText: 'Get Started', bgColor: '#FFF1F2', textColor: '#881337', accentColor: '#F43F5E' }),
      createComponent('footer', { brand: 'SocialPilot', copyright: '© 2026 SocialPilot.', bgColor: '#FECDD3', textColor: '#9F1239', accentColor: '#F43F5E' }),
    ],
  },
  {
    id: 'saas-api', name: 'API Developer Tool', description: 'API testing and documentation',
    category: 'saas', icon: 'Code',
    getComponents: () => [
      createComponent('navbar', { brand: 'APIForge', links: ['Docs', 'Pricing', 'Changelog', 'Login'], bgColor: '#0D1117', textColor: '#D1FAE5', accentColor: '#10B981' }),
      createComponent('hero', { heading: 'Build APIs That Developers Love', subheading: 'Design, test, and document REST & GraphQL APIs. Auto-generate SDKs in 10+ languages.', buttonText: 'Start Building', bgColor: '#0D1117', textColor: '#FFFFFF', accentColor: '#10B981' }),
      createComponent('features', { heading: 'Developer-First Tools', items: [{ title: 'API Designer', desc: 'Visual OpenAPI editor' }, { title: 'Mock Server', desc: 'Instant API mocking' }, { title: 'Testing', desc: 'Automated contract testing' }, { title: 'Documentation', desc: 'Beautiful auto-generated docs' }], bgColor: '#161B22', textColor: '#D1FAE5', accentColor: '#10B981' }),
      createComponent('stats', { items: [{ value: '500K+', label: 'APIs Built' }, { value: '200K+', label: 'Developers' }, { value: '10+', label: 'SDK Languages' }], bgColor: '#0D1117', textColor: '#D1FAE5', accentColor: '#10B981' }),
      createComponent('cta', { heading: 'Ship Better APIs', subheading: 'Free for individual developers.', buttonText: 'Try Free', bgColor: '#0D1117', textColor: '#FFFFFF', accentColor: '#10B981' }),
      createComponent('footer', { brand: 'APIForge', copyright: '© 2026 APIForge.', bgColor: '#080C10', textColor: '#4A6B5C', accentColor: '#10B981' }),
    ],
  },
  {
    id: 'saas-security', name: 'Cybersecurity', description: 'Security monitoring platform',
    category: 'saas', icon: 'Shield',
    getComponents: () => [
      createComponent('navbar', { brand: 'SecureNet', links: ['Solutions', 'Pricing', 'Resources', 'Login'], bgColor: '#1A0A0A', textColor: '#FEE2E2', accentColor: '#DC2626' }),
      createComponent('hero', { heading: 'Zero Trust Security', subheading: 'Protect your infrastructure with AI-powered threat detection, real-time monitoring, and automated response.', buttonText: 'Get Protected', bgColor: '#1A0A0A', textColor: '#FFFFFF', accentColor: '#DC2626' }),
      createComponent('features', { heading: 'Enterprise Security', items: [{ title: 'Threat Detection', desc: 'AI-powered anomaly analysis' }, { title: 'SIEM', desc: 'Centralized security logs' }, { title: 'Compliance', desc: 'SOC2, HIPAA, GDPR ready' }, { title: 'Incident Response', desc: 'Automated remediation' }], bgColor: '#251010', textColor: '#FEE2E2', accentColor: '#DC2626' }),
      createComponent('stats', { items: [{ value: '99.9%', label: 'Threat Detection' }, { value: '<1min', label: 'Response Time' }, { value: '5K+', label: 'Companies Protected' }], bgColor: '#1A0A0A', textColor: '#FEE2E2', accentColor: '#DC2626' }),
      createComponent('cta', { heading: 'Secure Your Business', subheading: 'Free security audit for new customers.', buttonText: 'Book Audit', bgColor: '#1A0A0A', textColor: '#FFFFFF', accentColor: '#DC2626' }),
      createComponent('footer', { brand: 'SecureNet', copyright: '© 2026 SecureNet Security.', bgColor: '#100505', textColor: '#8B6B6B', accentColor: '#DC2626' }),
    ],
  },
  {
    id: 'saas-survey', name: 'Survey Builder', description: 'Online forms and surveys',
    category: 'saas', icon: 'ClipboardList',
    getComponents: () => [
      createComponent('navbar', { brand: 'FormCraft', links: ['Templates', 'Pricing', 'Integrations', 'Login'], bgColor: '#ECFEFF', textColor: '#164E63', accentColor: '#0891B2' }),
      createComponent('hero', { heading: 'Beautiful Surveys People Love', subheading: 'Create engaging forms and surveys that boost response rates by 3x. Drag-and-drop simplicity.', buttonText: 'Create a Survey', bgColor: '#ECFEFF', textColor: '#164E63', accentColor: '#0891B2' }),
      createComponent('features', { heading: 'Smart Form Builder', items: [{ title: 'Logic Branching', desc: 'Show relevant questions only' }, { title: '50+ Question Types', desc: 'NPS, matrix, file uploads' }, { title: 'Analytics', desc: 'Real-time response dashboard' }, { title: 'Integrations', desc: 'Slack, Sheets, Salesforce' }], bgColor: '#CFFAFE', textColor: '#164E63', accentColor: '#0891B2' }),
      createComponent('stats', { items: [{ value: '10M+', label: 'Responses Collected' }, { value: '200K+', label: 'Forms Created' }, { value: '68%', label: 'Avg Response Rate' }], bgColor: '#ECFEFF', textColor: '#164E63', accentColor: '#0891B2' }),
      createComponent('cta', { heading: 'Start Collecting Insights', subheading: 'Free plan with unlimited forms.', buttonText: 'Get Started Free', bgColor: '#ECFEFF', textColor: '#164E63', accentColor: '#0891B2' }),
      createComponent('footer', { brand: 'FormCraft', copyright: '© 2026 FormCraft.', bgColor: '#B2EBF2', textColor: '#0E4F5E', accentColor: '#0891B2' }),
    ],
  },
  {
    id: 'saas-password', name: 'Password Manager', description: 'Secure password vault',
    category: 'saas', icon: 'Lock',
    getComponents: () => [
      createComponent('navbar', { brand: 'VaultKey', links: ['Security', 'Pricing', 'Business', 'Download'], bgColor: '#0A0E1A', textColor: '#BFDBFE', accentColor: '#2563EB' }),
      createComponent('hero', { heading: 'Never Forget a Password', subheading: 'Military-grade encryption. Zero-knowledge architecture. One master password for everything.', buttonText: 'Download Free', bgColor: '#0A0E1A', textColor: '#FFFFFF', accentColor: '#2563EB' }),
      createComponent('features', { heading: 'Unbreakable Security', items: [{ title: 'AES-256 Encryption', desc: 'Bank-level security for all data' }, { title: 'Auto-Fill', desc: 'One-click login on all sites' }, { title: 'Password Generator', desc: 'Create strong unique passwords' }, { title: 'Secure Sharing', desc: 'Share credentials safely with team' }], bgColor: '#101828', textColor: '#BFDBFE', accentColor: '#2563EB' }),
      createComponent('stats', { items: [{ value: '5M+', label: 'Users' }, { value: '0', label: 'Breaches' }, { value: 'AES-256', label: 'Encryption' }], bgColor: '#0A0E1A', textColor: '#BFDBFE', accentColor: '#2563EB' }),
      createComponent('cta', { heading: 'Protect Your Digital Life', subheading: 'Free for personal use. Premium for teams.', buttonText: 'Download Now', bgColor: '#0A0E1A', textColor: '#FFFFFF', accentColor: '#2563EB' }),
      createComponent('footer', { brand: 'VaultKey', copyright: '© 2026 VaultKey Security.', bgColor: '#060A14', textColor: '#4A6B8B', accentColor: '#2563EB' }),
    ],
  },
  {
    id: 'saas-events', name: 'Event Platform', description: 'Event management and ticketing',
    category: 'saas', icon: 'Calendar',
    getComponents: () => [
      createComponent('navbar', { brand: 'EventFlow', links: ['Features', 'Pricing', 'Explore', 'Login'], bgColor: '#160B22', textColor: '#F3E8FF', accentColor: '#A855F7' }),
      createComponent('hero', { heading: 'Events Made Magical', subheading: 'Plan, promote, and sell tickets for events of any size. From workshops to festivals.', buttonText: 'Create Event', bgColor: '#160B22', textColor: '#FFFFFF', accentColor: '#A855F7' }),
      createComponent('features', { heading: 'Event Management Suite', items: [{ title: 'Ticketing', desc: 'Custom tickets with QR codes' }, { title: 'Registration', desc: 'Branded registration pages' }, { title: 'Check-In', desc: 'Mobile app for door staff' }, { title: 'Analytics', desc: 'Attendee insights and reports' }], bgColor: '#1F1133', textColor: '#F3E8FF', accentColor: '#A855F7' }),
      createComponent('stats', { items: [{ value: '500K+', label: 'Events Created' }, { value: '20M+', label: 'Tickets Sold' }, { value: '100+', label: 'Countries' }], bgColor: '#160B22', textColor: '#F3E8FF', accentColor: '#A855F7' }),
      createComponent('cta', { heading: 'Host Your Next Event', subheading: 'Free for events under 50 attendees.', buttonText: 'Start Planning', bgColor: '#160B22', textColor: '#FFFFFF', accentColor: '#A855F7' }),
      createComponent('footer', { brand: 'EventFlow', copyright: '© 2026 EventFlow.', bgColor: '#0D0616', textColor: '#6B5A8B', accentColor: '#A855F7' }),
    ],
  },
  {
    id: 'saas-recruit', name: 'Recruitment Tool', description: 'Applicant tracking system',
    category: 'saas', icon: 'Briefcase',
    getComponents: () => [
      createComponent('navbar', { brand: 'HireWise', links: ['Features', 'Pricing', 'Customers', 'Login'], bgColor: '#071209', textColor: '#A7F3D0', accentColor: '#059669' }),
      createComponent('hero', { heading: 'Hire the Best Talent', subheading: 'AI-powered applicant tracking with automated screening, interview scheduling, and candidate scoring.', buttonText: 'Try Free', bgColor: '#071209', textColor: '#FFFFFF', accentColor: '#059669' }),
      createComponent('features', { heading: 'Modern Recruiting', items: [{ title: 'AI Screening', desc: 'Automatically rank candidates' }, { title: 'Job Board', desc: 'Post to 50+ job boards' }, { title: 'Scheduling', desc: 'Automated interview coordination' }, { title: 'Onboarding', desc: 'Smooth new-hire experience' }], bgColor: '#0D1E12', textColor: '#A7F3D0', accentColor: '#059669' }),
      createComponent('stats', { items: [{ value: '2M+', label: 'Hires Made' }, { value: '40%', label: 'Faster Hiring' }, { value: '10K+', label: 'Companies' }], bgColor: '#071209', textColor: '#A7F3D0', accentColor: '#059669' }),
      createComponent('cta', { heading: 'Build Your Dream Team', subheading: 'Free for up to 3 active jobs.', buttonText: 'Get Started', bgColor: '#071209', textColor: '#FFFFFF', accentColor: '#059669' }),
      createComponent('footer', { brand: 'HireWise', copyright: '© 2026 HireWise.', bgColor: '#040C06', textColor: '#4A6B55', accentColor: '#059669' }),
    ],
  },
  {
    id: 'saas-design', name: 'Design Tool', description: 'Collaborative design platform',
    category: 'saas', icon: 'Palette',
    getComponents: () => [
      createComponent('navbar', { brand: 'PixelCraft', links: ['Features', 'Community', 'Pricing', 'Open App'], bgColor: '#FFFBEB', textColor: '#78350F', accentColor: '#B45309' }),
      createComponent('hero', { heading: 'Design Without Limits', subheading: 'Browser-based design tool for teams. Real-time collaboration, vector editing, and prototyping.', buttonText: 'Open in Browser', bgColor: '#FFFBEB', textColor: '#78350F', accentColor: '#B45309' }),
      createComponent('features', { heading: 'Professional Design Tools', items: [{ title: 'Vector Editor', desc: 'Pen tool, shapes, and boolean ops' }, { title: 'Prototyping', desc: 'Interactive clickable prototypes' }, { title: 'Components', desc: 'Reusable design system library' }, { title: 'Handoff', desc: 'Auto-generate CSS and assets' }], bgColor: '#FEF3C7', textColor: '#78350F', accentColor: '#B45309' }),
      createComponent('stats', { items: [{ value: '3M+', label: 'Designers' }, { value: '50M+', label: 'Projects' }, { value: '4.8★', label: 'Rating' }], bgColor: '#FFFBEB', textColor: '#78350F', accentColor: '#B45309' }),
      createComponent('cta', { heading: 'Start Designing', subheading: 'Free for individuals. Premium for teams.', buttonText: 'Try Free', bgColor: '#FFFBEB', textColor: '#78350F', accentColor: '#B45309' }),
      createComponent('footer', { brand: 'PixelCraft', copyright: '© 2026 PixelCraft Design.', bgColor: '#FDE68A', textColor: '#92400E', accentColor: '#B45309' }),
    ],
  },
  {
    id: 'saas-workflow', name: 'Workflow Automation', description: 'No-code automation platform',
    category: 'saas', icon: 'Workflow',
    getComponents: () => [
      createComponent('navbar', { brand: 'FlowMate', links: ['Integrations', 'Pricing', 'Templates', 'Login'], bgColor: '#0F0B1A', textColor: '#E2DFF0', accentColor: '#7C3AED' }),
      createComponent('hero', { heading: 'Automate Any Workflow', subheading: 'Connect 500+ apps and automate repetitive tasks. No coding required. Save 10+ hours per week.', buttonText: 'Start Automating', bgColor: '#0F0B1A', textColor: '#FFFFFF', accentColor: '#7C3AED' }),
      createComponent('features', { heading: 'Powerful Automation', items: [{ title: '500+ Integrations', desc: 'Connect all your favorite apps' }, { title: 'Visual Builder', desc: 'Drag-and-drop workflow designer' }, { title: 'Conditional Logic', desc: 'If-then branching and filters' }, { title: 'Scheduled Triggers', desc: 'Run workflows on any schedule' }], bgColor: '#1A1425', textColor: '#E2DFF0', accentColor: '#7C3AED' }),
      createComponent('stats', { items: [{ value: '100M+', label: 'Automations Run' }, { value: '500+', label: 'Integrations' }, { value: '50K+', label: 'Teams' }], bgColor: '#0F0B1A', textColor: '#E2DFF0', accentColor: '#7C3AED' }),
      createComponent('cta', { heading: 'Stop Doing It Manually', subheading: 'Free for up to 100 tasks/month.', buttonText: 'Get Started Free', bgColor: '#0F0B1A', textColor: '#FFFFFF', accentColor: '#7C3AED' }),
      createComponent('footer', { brand: 'FlowMate', copyright: '© 2026 FlowMate.', bgColor: '#0A0712', textColor: '#6B6580', accentColor: '#7C3AED' }),
    ],
  },
  {
    id: 'saas-data', name: 'Data Pipeline', description: 'ETL and data integration',
    category: 'saas', icon: 'Database',
    getComponents: () => [
      createComponent('navbar', { brand: 'DataSync', links: ['Connectors', 'Pricing', 'Docs', 'Login'], bgColor: '#0B1519', textColor: '#CCFBF1', accentColor: '#14B8A6' }),
      createComponent('hero', { heading: 'Data Pipelines in Minutes', subheading: 'Extract, transform, and load data from any source. Real-time sync with 300+ connectors.', buttonText: 'Start Free', bgColor: '#0B1519', textColor: '#FFFFFF', accentColor: '#14B8A6' }),
      createComponent('features', { heading: 'Enterprise Data Integration', items: [{ title: '300+ Connectors', desc: 'Databases, APIs, SaaS apps' }, { title: 'Real-Time Sync', desc: 'CDC and streaming support' }, { title: 'Transformations', desc: 'SQL and Python transforms' }, { title: 'Monitoring', desc: 'Pipeline health dashboards' }], bgColor: '#0F1F1D', textColor: '#CCFBF1', accentColor: '#14B8A6' }),
      createComponent('cta', { heading: 'Unify Your Data', subheading: 'Free tier with 5 connectors.', buttonText: 'Try DataSync', bgColor: '#0B1519', textColor: '#FFFFFF', accentColor: '#14B8A6' }),
      createComponent('footer', { brand: 'DataSync', copyright: '© 2026 DataSync.', bgColor: '#070F0E', textColor: '#4A6B63', accentColor: '#14B8A6' }),
    ],
  },
  {
    id: 'saas-knowledge', name: 'Knowledge Base', description: 'Help center and documentation',
    category: 'saas', icon: 'BookOpen',
    getComponents: () => [
      createComponent('navbar', { brand: 'DocuBase', links: ['Features', 'Pricing', 'Examples', 'Login'], bgColor: '#F8FAFC', textColor: '#1E293B', accentColor: '#475569' }),
      createComponent('hero', { heading: 'Help Center Made Easy', subheading: 'Create beautiful knowledge bases and documentation sites. Reduce support tickets by 40%.', buttonText: 'Create Docs', bgColor: '#F8FAFC', textColor: '#1E293B', accentColor: '#475569' }),
      createComponent('features', { heading: 'Documentation Tools', items: [{ title: 'WYSIWYG Editor', desc: 'Rich text and markdown support' }, { title: 'Search', desc: 'AI-powered instant search' }, { title: 'Analytics', desc: 'See what users search for' }, { title: 'Custom Domain', desc: 'docs.yourbrand.com' }], bgColor: '#F1F5F9', textColor: '#1E293B', accentColor: '#475569' }),
      createComponent('stats', { items: [{ value: '20K+', label: 'Help Centers' }, { value: '40%', label: 'Fewer Tickets' }, { value: '4.7★', label: 'Rating' }], bgColor: '#F8FAFC', textColor: '#1E293B', accentColor: '#475569' }),
      createComponent('cta', { heading: 'Empower Self-Service', subheading: 'Free for up to 50 articles.', buttonText: 'Start Free', bgColor: '#F8FAFC', textColor: '#1E293B', accentColor: '#475569' }),
      createComponent('footer', { brand: 'DocuBase', copyright: '© 2026 DocuBase.', bgColor: '#E2E8F0', textColor: '#64748B', accentColor: '#475569' }),
    ],
  },
  {
    id: 'saas-project', name: 'Project Management', description: 'Team project tracking',
    category: 'saas', icon: 'Kanban',
    getComponents: () => [
      createComponent('navbar', { brand: 'TaskFlow', links: ['Features', 'Pricing', 'Templates', 'Login'], bgColor: '#1A1706', textColor: '#FEF9C3', accentColor: '#EAB308' }),
      createComponent('hero', { heading: 'Projects, Simplified', subheading: 'Kanban boards, Gantt charts, and sprint planning. The project tool your team will actually enjoy using.', buttonText: 'Try Free', bgColor: '#1A1706', textColor: '#FFFFFF', accentColor: '#EAB308' }),
      createComponent('features', { heading: 'Work Your Way', items: [{ title: 'Kanban', desc: 'Visual card-based workflow' }, { title: 'Gantt Charts', desc: 'Timeline and dependency tracking' }, { title: 'Sprints', desc: 'Agile sprint management' }, { title: 'Time Tracking', desc: 'Built-in time logs and reports' }], bgColor: '#25210C', textColor: '#FEF9C3', accentColor: '#EAB308' }),
      createComponent('stats', { items: [{ value: '200K+', label: 'Teams' }, { value: '5M+', label: 'Projects' }, { value: '99.9%', label: 'Uptime' }], bgColor: '#1A1706', textColor: '#FEF9C3', accentColor: '#EAB308' }),
      createComponent('cta', { heading: 'Get Organized', subheading: 'Free for teams up to 5 members.', buttonText: 'Start Free', bgColor: '#1A1706', textColor: '#FFFFFF', accentColor: '#EAB308' }),
      createComponent('footer', { brand: 'TaskFlow', copyright: '© 2026 TaskFlow.', bgColor: '#100E04', textColor: '#8B8A6B', accentColor: '#EAB308' }),
    ],
  },
  {
    id: 'saas-file', name: 'Cloud Storage', description: 'File sharing and collaboration',
    category: 'saas', icon: 'Cloud',
    getComponents: () => [
      createComponent('navbar', { brand: 'CloudVault', links: ['Features', 'Plans', 'Security', 'Login'], bgColor: '#FFFFFF', textColor: '#1E3A5F', accentColor: '#1E40AF' }),
      createComponent('hero', { heading: 'Your Files, Everywhere', subheading: 'Secure cloud storage with real-time collaboration. Share, sync, and access files from any device.', buttonText: 'Get 15GB Free', bgColor: '#FFFFFF', textColor: '#1E3A5F', accentColor: '#1E40AF' }),
      createComponent('features', { heading: 'Smart File Management', items: [{ title: 'Auto Sync', desc: 'Sync across all your devices' }, { title: 'Collaboration', desc: 'Co-edit documents in real-time' }, { title: 'Versioning', desc: '30-day file version history' }, { title: 'E2E Encryption', desc: 'Zero-knowledge encryption' }], bgColor: '#EFF6FF', textColor: '#1E3A5F', accentColor: '#1E40AF' }),
      createComponent('stats', { items: [{ value: '10M+', label: 'Users' }, { value: '1PB', label: 'Data Stored' }, { value: '99.99%', label: 'Uptime' }], bgColor: '#FFFFFF', textColor: '#1E3A5F', accentColor: '#1E40AF' }),
      createComponent('cta', { heading: 'Store Smarter', subheading: '15GB free forever. No credit card.', buttonText: 'Sign Up Free', bgColor: '#FFFFFF', textColor: '#1E3A5F', accentColor: '#1E40AF' }),
      createComponent('footer', { brand: 'CloudVault', copyright: '© 2026 CloudVault.', bgColor: '#E0EDFF', textColor: '#3B6AA0', accentColor: '#1E40AF' }),
    ],
  },
  {
    id: 'saas-chat', name: 'Team Chat', description: 'Real-time team communication',
    category: 'saas', icon: 'MessageCircle',
    getComponents: () => [
      createComponent('navbar', { brand: 'Chatly', links: ['Features', 'Pricing', 'Download', 'Login'], bgColor: '#0D1117', textColor: '#D1FAE5', accentColor: '#34D399' }),
      createComponent('hero', { heading: 'Team Chat, Reimagined', subheading: 'Channels, threads, video calls, and file sharing. The modern workspace your team deserves.', buttonText: 'Get Started Free', bgColor: '#0D1117', textColor: '#FFFFFF', accentColor: '#34D399' }),
      createComponent('features', { heading: 'Communication Made Easy', items: [{ title: 'Channels', desc: 'Organized topic-based conversations' }, { title: 'Video Calls', desc: 'HD video and screen sharing' }, { title: 'File Sharing', desc: 'Drag-and-drop file uploads' }, { title: 'Search', desc: 'Find any message instantly' }], bgColor: '#161B22', textColor: '#D1FAE5', accentColor: '#34D399' }),
      createComponent('cta', { heading: 'Connect Your Team', subheading: 'Free for teams up to 10 members.', buttonText: 'Start Chatting', bgColor: '#0D1117', textColor: '#FFFFFF', accentColor: '#34D399' }),
      createComponent('footer', { brand: 'Chatly', copyright: '© 2026 Chatly.', bgColor: '#080C10', textColor: '#4A6B5C', accentColor: '#34D399' }),
    ],
  },
];

// ─── PORTFOLIO TEMPLATES (25) ────────────────────────────
const portfolioTemplates: Template[] = [
  {
    id: 'port-designer', name: 'UI/UX Designer', description: 'Clean design portfolio',
    category: 'portfolio', icon: 'Palette',
    getComponents: () => [
      createComponent('navbar', { brand: 'Emma Studio', links: ['Work', 'About', 'Services', 'Contact'], bgColor: '#0A0A0A', textColor: '#E5E5E5', accentColor: '#F59E0B' }),
      createComponent('hero', { heading: 'I Design Digital Experiences', subheading: 'UI/UX designer with 8+ years crafting interfaces for startups and Fortune 500 companies.', buttonText: 'View My Work', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#F59E0B' }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1567095761054-7a02e69e5b2b?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop'], columns: 3, gap: '16px' }),
      createComponent('features', { heading: 'Services', items: [{ title: 'UI Design', desc: 'Beautiful, intuitive interfaces' }, { title: 'UX Research', desc: 'User-centered design process' }, { title: 'Brand Identity', desc: 'Logos, colors, typography' }], bgColor: '#141414', textColor: '#E5E5E5', accentColor: '#F59E0B' }),
      createComponent('testimonial', { quote: '"Emma transformed our app from confusing to delightful. Our user retention jumped 60%."', author: 'Jake Morrison', role: 'CEO at AppFlow', bgColor: '#0A0A0A', textColor: '#E5E5E5', accentColor: '#F59E0B' }),
      createComponent('cta', { heading: "Let's Create Together", subheading: 'Available for freelance projects starting Q2 2026.', buttonText: 'Get in Touch', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#F59E0B' }),
      createComponent('footer', { brand: 'Emma Studio', copyright: '© 2026 Emma Studio.', bgColor: '#050505', textColor: '#666666', accentColor: '#F59E0B' }),
    ],
  },
  {
    id: 'port-developer', name: 'Full-Stack Developer', description: 'Developer showcase',
    category: 'portfolio', icon: 'Code',
    getComponents: () => [
      createComponent('navbar', { brand: 'dev.alex', links: ['Projects', 'Stack', 'Blog', 'Contact'], bgColor: '#000000', textColor: '#D4D4D4', accentColor: '#FFFFFF' }),
      createComponent('hero', { heading: 'Full-Stack Developer', subheading: 'Building scalable web apps with React, Node.js, and TypeScript. Open source contributor.', buttonText: 'See Projects', bgColor: '#000000', textColor: '#FFFFFF', accentColor: '#FFFFFF' }),
      createComponent('stats', { items: [{ value: '50+', label: 'Projects Shipped' }, { value: '12K+', label: 'GitHub Stars' }, { value: '8+', label: 'Years Experience' }], bgColor: '#111111', textColor: '#D4D4D4', accentColor: '#FFFFFF' }),
      createComponent('features', { heading: 'Tech Stack', items: [{ title: 'Frontend', desc: 'React, Next.js, TypeScript, Tailwind' }, { title: 'Backend', desc: 'Node.js, Python, PostgreSQL, Redis' }, { title: 'DevOps', desc: 'Docker, AWS, CI/CD, Terraform' }], bgColor: '#111111', textColor: '#D4D4D4', accentColor: '#FFFFFF' }),
      createComponent('testimonial', { quote: '"Alex delivered our MVP in 3 weeks. Clean code, great communication, exceeded expectations."', author: 'Maria Santos', role: 'Founder at TechStart', bgColor: '#000000', textColor: '#D4D4D4', accentColor: '#FFFFFF' }),
      createComponent('cta', { heading: "Let's Build Something", subheading: 'Open to freelance and contract work.', buttonText: 'Hire Me', bgColor: '#000000', textColor: '#FFFFFF', accentColor: '#FFFFFF' }),
      createComponent('footer', { brand: 'dev.alex', copyright: '© 2026 Alex Chen.', bgColor: '#000000', textColor: '#555555', accentColor: '#FFFFFF' }),
    ],
  },
  {
    id: 'port-photographer', name: 'Photographer', description: 'Photography portfolio',
    category: 'portfolio', icon: 'Camera',
    getComponents: () => [
      createComponent('navbar', { brand: 'Lens & Light', links: ['Portfolio', 'About', 'Pricing', 'Book'], bgColor: '#1C1917', textColor: '#E7E5E4', accentColor: '#F97316' }),
      createComponent('hero', { heading: 'Capturing Life\'s Moments', subheading: 'Wedding, portrait, and editorial photographer based in New York. Available worldwide.', buttonText: 'View Gallery', bgColor: '#1C1917', textColor: '#FFFFFF', accentColor: '#F97316' }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop'], columns: 3, gap: '8px' }),
      createComponent('features', { heading: 'Services', items: [{ title: 'Weddings', desc: 'Full day coverage from $3,500' }, { title: 'Portraits', desc: 'Studio and outdoor sessions' }, { title: 'Commercial', desc: 'Product and brand photography' }], bgColor: '#292524', textColor: '#E7E5E4', accentColor: '#F97316' }),
      createComponent('testimonial', { quote: '"The photos from our wedding are absolutely breathtaking. Every moment was captured perfectly."', author: 'Jessica & Tom', role: 'Wedding, June 2025', bgColor: '#1C1917', textColor: '#E7E5E4', accentColor: '#F97316' }),
      createComponent('cta', { heading: 'Book Your Session', subheading: 'Limited availability for 2026. Book early.', buttonText: 'Check Availability', bgColor: '#1C1917', textColor: '#FFFFFF', accentColor: '#F97316' }),
      createComponent('footer', { brand: 'Lens & Light', copyright: '© 2026 Lens & Light Photography.', bgColor: '#0F0E0D', textColor: '#78716C', accentColor: '#F97316' }),
    ],
  },
  {
    id: 'port-motion', name: 'Motion Designer', description: 'Animation and motion graphics',
    category: 'portfolio', icon: 'Film',
    getComponents: () => [
      createComponent('navbar', { brand: 'MotionLab', links: ['Reel', 'Projects', 'About', 'Hire Me'], bgColor: '#FFFBEB', textColor: '#451A03', accentColor: '#92400E' }),
      createComponent('hero', { heading: 'Motion & Animation', subheading: 'Creating captivating animations for brands, products, and stories. After Effects, Cinema 4D, Blender.', buttonText: 'Watch Reel', bgColor: '#FFFBEB', textColor: '#451A03', accentColor: '#92400E' }),
      createComponent('features', { heading: 'What I Do', items: [{ title: '2D Animation', desc: 'Character and explainer animations' }, { title: '3D Motion', desc: 'Product renders and visualizations' }, { title: 'Brand Motion', desc: 'Logo reveals and motion systems' }], bgColor: '#FEF3C7', textColor: '#451A03', accentColor: '#92400E' }),
      createComponent('stats', { items: [{ value: '200+', label: 'Projects' }, { value: '50+', label: 'Brands' }, { value: '10M+', label: 'Views' }], bgColor: '#FFFBEB', textColor: '#451A03', accentColor: '#92400E' }),
      createComponent('testimonial', { quote: '"The animation quality is outstanding. Our product video got 2M views in the first week."', author: 'David Kim', role: 'Marketing Director at Shopify', bgColor: '#FEF3C7', textColor: '#451A03', accentColor: '#92400E' }),
      createComponent('cta', { heading: 'Bring Your Vision to Life', subheading: 'Currently accepting projects for Q2 2026.', buttonText: 'Start a Project', bgColor: '#FFFBEB', textColor: '#451A03', accentColor: '#92400E' }),
      createComponent('footer', { brand: 'MotionLab', copyright: '© 2026 MotionLab.', bgColor: '#FDE68A', textColor: '#92400E', accentColor: '#92400E' }),
    ],
  },
  {
    id: 'port-3d', name: '3D Artist', description: '3D modeling and rendering',
    category: 'portfolio', icon: 'Box',
    getComponents: () => [
      createComponent('navbar', { brand: 'Poly Studio', links: ['Gallery', 'Services', 'About', 'Contact'], bgColor: '#0C1222', textColor: '#BAE6FD', accentColor: '#0284C7' }),
      createComponent('hero', { heading: 'Worlds in 3D', subheading: 'Creating photorealistic 3D environments, characters, and product visualizations for games and film.', buttonText: 'Explore Work', bgColor: '#0C1222', textColor: '#FFFFFF', accentColor: '#0284C7' }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop'], columns: 2, gap: '12px' }),
      createComponent('features', { heading: 'Specialties', items: [{ title: 'Environments', desc: 'Detailed 3D worlds and scenes' }, { title: 'Characters', desc: 'Game and film-ready characters' }, { title: 'Product Viz', desc: 'Photorealistic product renders' }], bgColor: '#111B30', textColor: '#BAE6FD', accentColor: '#0284C7' }),
      createComponent('cta', { heading: "Let's Create Something Epic", subheading: 'Freelance available. Remote worldwide.', buttonText: 'Contact Me', bgColor: '#0C1222', textColor: '#FFFFFF', accentColor: '#0284C7' }),
      createComponent('footer', { brand: 'Poly Studio', copyright: '© 2026 Poly Studio.', bgColor: '#080D18', textColor: '#5A7A9E', accentColor: '#0284C7' }),
    ],
  },
  {
    id: 'port-illustrator', name: 'Illustrator', description: 'Digital illustration portfolio',
    category: 'portfolio', icon: 'Paintbrush',
    getComponents: () => [
      createComponent('navbar', { brand: 'Ink & Pixel', links: ['Work', 'Shop', 'About', 'Commission'], bgColor: '#F0FDF4', textColor: '#14532D', accentColor: '#059669' }),
      createComponent('hero', { heading: 'Illustrations That Tell Stories', subheading: 'Editorial, book, and brand illustrator. Bringing ideas to life with color and imagination.', buttonText: 'See Portfolio', bgColor: '#F0FDF4', textColor: '#14532D', accentColor: '#059669' }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1567095761054-7a02e69e5b2b?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop'], columns: 3, gap: '12px' }),
      createComponent('features', { heading: 'Services', items: [{ title: 'Editorial', desc: 'Magazine and newspaper illustration' }, { title: 'Book Covers', desc: 'Eye-catching cover art' }, { title: 'Brand Art', desc: 'Custom illustrations for brands' }], bgColor: '#DCFCE7', textColor: '#14532D', accentColor: '#059669' }),
      createComponent('cta', { heading: 'Commission a Piece', subheading: 'Custom illustrations starting at $500.', buttonText: 'Get a Quote', bgColor: '#F0FDF4', textColor: '#14532D', accentColor: '#059669' }),
      createComponent('footer', { brand: 'Ink & Pixel', copyright: '© 2026 Ink & Pixel.', bgColor: '#BBF7D0', textColor: '#166534', accentColor: '#059669' }),
    ],
  },
  {
    id: 'port-copywriter', name: 'Copywriter', description: 'Writing and content portfolio',
    category: 'portfolio', icon: 'PenTool',
    getComponents: () => [
      createComponent('navbar', { brand: 'Words That Work', links: ['Portfolio', 'Services', 'Testimonials', 'Hire'], bgColor: '#09090B', textColor: '#FAFAFA', accentColor: '#E11D48' }),
      createComponent('hero', { heading: 'Words That Convert', subheading: 'Conversion copywriter specializing in SaaS, e-commerce, and email. Your words, but better.', buttonText: 'See My Work', bgColor: '#09090B', textColor: '#FFFFFF', accentColor: '#E11D48' }),
      createComponent('stats', { items: [{ value: '500+', label: 'Projects' }, { value: '$2M+', label: 'Revenue Generated' }, { value: '150+', label: 'Clients' }], bgColor: '#18181B', textColor: '#FAFAFA', accentColor: '#E11D48' }),
      createComponent('features', { heading: 'Writing Services', items: [{ title: 'Landing Pages', desc: 'High-converting page copy' }, { title: 'Email Sequences', desc: 'Nurture and sales sequences' }, { title: 'Brand Voice', desc: 'Messaging and tone guidelines' }], bgColor: '#18181B', textColor: '#FAFAFA', accentColor: '#E11D48' }),
      createComponent('testimonial', { quote: '"Our conversion rate tripled after the landing page rewrite. Best investment we\'ve made."', author: 'Rachel Kim', role: 'CMO at SaaScale', bgColor: '#09090B', textColor: '#FAFAFA', accentColor: '#E11D48' }),
      createComponent('cta', { heading: 'Need Better Copy?', subheading: 'Starting at $2,500 per project.', buttonText: 'Book a Call', bgColor: '#09090B', textColor: '#FFFFFF', accentColor: '#E11D48' }),
      createComponent('footer', { brand: 'Words That Work', copyright: '© 2026 Words That Work.', bgColor: '#09090B', textColor: '#52525B', accentColor: '#E11D48' }),
    ],
  },
  {
    id: 'port-video', name: 'Video Editor', description: 'Video production portfolio',
    category: 'portfolio', icon: 'Video',
    getComponents: () => [
      createComponent('navbar', { brand: 'CutPro', links: ['Reel', 'Projects', 'About', 'Contact'], bgColor: '#FFF1F2', textColor: '#831843', accentColor: '#BE185D' }),
      createComponent('hero', { heading: 'Editing That Captivates', subheading: 'Professional video editing for YouTube creators, brands, and filmmakers. Final Cut Pro & Premiere.', buttonText: 'Watch Reel', bgColor: '#FFF1F2', textColor: '#831843', accentColor: '#BE185D' }),
      createComponent('features', { heading: 'What I Edit', items: [{ title: 'YouTube', desc: 'Fast-paced creator content' }, { title: 'Commercials', desc: 'Brand and product videos' }, { title: 'Documentaries', desc: 'Long-form storytelling' }], bgColor: '#FCE7F3', textColor: '#831843', accentColor: '#BE185D' }),
      createComponent('stats', { items: [{ value: '1000+', label: 'Videos Edited' }, { value: '100M+', label: 'Total Views' }, { value: '50+', label: 'Creators' }], bgColor: '#FFF1F2', textColor: '#831843', accentColor: '#BE185D' }),
      createComponent('cta', { heading: 'Ready to Create?', subheading: 'Fast turnaround. Unlimited revisions.', buttonText: 'Start a Project', bgColor: '#FFF1F2', textColor: '#831843', accentColor: '#BE185D' }),
      createComponent('footer', { brand: 'CutPro', copyright: '© 2026 CutPro Studios.', bgColor: '#FBCFE8', textColor: '#9D174D', accentColor: '#BE185D' }),
    ],
  },
  {
    id: 'port-musician', name: 'Musician', description: 'Music artist portfolio',
    category: 'portfolio', icon: 'Music',
    getComponents: () => [
      createComponent('navbar', { brand: 'NOVA', links: ['Music', 'Tour', 'Merch', 'Contact'], bgColor: '#F0FDFA', textColor: '#134E4A', accentColor: '#0D9488' }),
      createComponent('hero', { heading: 'NOVA', subheading: 'Indie electronic artist. New album "Horizons" out now. 50-city world tour starting March 2026.', buttonText: 'Listen Now', bgColor: '#F0FDFA', textColor: '#134E4A', accentColor: '#0D9488' }),
      createComponent('stats', { items: [{ value: '10M+', label: 'Monthly Listeners' }, { value: '3', label: 'Albums' }, { value: '50', label: 'Tour Cities' }], bgColor: '#CCFBF1', textColor: '#134E4A', accentColor: '#0D9488' }),
      createComponent('features', { heading: 'Latest Releases', items: [{ title: 'Horizons (2026)', desc: '12 tracks of dreamy synthwave' }, { title: 'Echoes (2024)', desc: 'Ambient electronic exploration' }, { title: 'Pulse (2022)', desc: 'High-energy debut album' }], bgColor: '#CCFBF1', textColor: '#134E4A', accentColor: '#0D9488' }),
      createComponent('cta', { heading: 'Catch a Live Show', subheading: 'World tour tickets on sale now.', buttonText: 'Get Tickets', bgColor: '#F0FDFA', textColor: '#134E4A', accentColor: '#0D9488' }),
      createComponent('footer', { brand: 'NOVA', copyright: '© 2026 NOVA Music.', bgColor: '#99F6E4', textColor: '#115E59', accentColor: '#0D9488' }),
    ],
  },
  {
    id: 'port-architect', name: 'Architect', description: 'Architecture portfolio',
    category: 'portfolio', icon: 'Building',
    getComponents: () => [
      createComponent('navbar', { brand: 'ARC Studio', links: ['Projects', 'Services', 'About', 'Contact'], bgColor: '#09090B', textColor: '#FAFAFA', accentColor: '#F43F5E' }),
      createComponent('hero', { heading: 'Architecture of Tomorrow', subheading: 'Award-winning architectural studio specializing in sustainable, modern design. Based in Copenhagen.', buttonText: 'Our Projects', bgColor: '#09090B', textColor: '#FFFFFF', accentColor: '#F43F5E' }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=400&h=400&fit=crop'], columns: 2, gap: '8px' }),
      createComponent('features', { heading: 'Services', items: [{ title: 'Residential', desc: 'Custom homes and apartments' }, { title: 'Commercial', desc: 'Offices, retail, and hospitality' }, { title: 'Urban Design', desc: 'Master planning and public spaces' }], bgColor: '#18181B', textColor: '#FAFAFA', accentColor: '#F43F5E' }),
      createComponent('cta', { heading: 'Start Your Project', subheading: 'Free initial consultation for new clients.', buttonText: 'Book Consultation', bgColor: '#09090B', textColor: '#FFFFFF', accentColor: '#F43F5E' }),
      createComponent('footer', { brand: 'ARC Studio', copyright: '© 2026 ARC Studio.', bgColor: '#09090B', textColor: '#52525B', accentColor: '#F43F5E' }),
    ],
  },
  // Additional portfolio templates (concise)
  ...(['Product Designer', 'Brand Designer', 'Data Scientist', 'Game Developer', 'Mobile Developer', 'DevOps Engineer', 'Technical Writer', 'SEO Specialist', 'Growth Marketer', 'Filmmaker', 'Podcast Host', 'Life Coach', 'Fitness Trainer', 'Interior Designer', 'Fashion Designer'].map((name, i) => ({
    id: `port-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    description: `${name} portfolio site`,
    category: 'portfolio' as const,
    icon: 'User',
    getComponents: () => {
      const colors = [
        { primary: '#8B5CF6', bg: '#13111C', surface: '#1C1929', text: '#EDE9FE' },
        { primary: '#06B6D4', bg: '#0B1519', surface: '#0F1D23', text: '#CFFAFE' },
        { primary: '#F59E0B', bg: '#1A1706', surface: '#25210C', text: '#FEF9C3' },
        { primary: '#EC4899', bg: '#1A0B14', surface: '#25101E', text: '#FCE7F3' },
        { primary: '#10B981', bg: '#071209', surface: '#0D1E12', text: '#D1FAE5' },
        { primary: '#3B82F6', bg: '#0B1120', surface: '#111827', text: '#DBEAFE' },
        { primary: '#EF4444', bg: '#1A0A0A', surface: '#251010', text: '#FEE2E2' },
        { primary: '#14B8A6', bg: '#0B1514', surface: '#0F1F1D', text: '#CCFBF1' },
        { primary: '#F97316', bg: '#1A110B', surface: '#251A10', text: '#FFEDD5' },
        { primary: '#6366F1', bg: '#0F0F1F', surface: '#16162B', text: '#E0E7FF' },
        { primary: '#D946EF', bg: '#1A0B1F', surface: '#25112E', text: '#FAE8FF' },
        { primary: '#84CC16', bg: '#0B1207', surface: '#141E0D', text: '#ECFCCB' },
        { primary: '#0EA5E9', bg: '#0B1520', surface: '#0F1D2B', text: '#BAE6FD' },
        { primary: '#F43F5E', bg: '#1A0B0F', surface: '#25101A', text: '#FFE4E6' },
        { primary: '#A855F7', bg: '#160B22', surface: '#1F1133', text: '#F3E8FF' },
      ][i];
      return [
        createComponent('navbar', { brand: `${name.split(' ')[0]}'s Portfolio`, links: ['Work', 'About', 'Contact'], bgColor: colors.bg, textColor: colors.text, accentColor: colors.primary }),
        createComponent('hero', { heading: `${name}`, subheading: `Professional ${name.toLowerCase()} with a passion for creating exceptional work. Available for hire.`, buttonText: 'View Work', bgColor: colors.bg, textColor: '#FFFFFF', accentColor: colors.primary }),
        createComponent('features', { heading: 'What I Do', items: [{ title: 'Strategy', desc: 'Research-driven approach' }, { title: 'Execution', desc: 'Pixel-perfect delivery' }, { title: 'Collaboration', desc: 'Seamless team integration' }], bgColor: colors.surface, textColor: colors.text, accentColor: colors.primary }),
        createComponent('stats', { items: [{ value: '100+', label: 'Projects' }, { value: '50+', label: 'Clients' }, { value: '8+', label: 'Years' }], bgColor: colors.bg, textColor: colors.text, accentColor: colors.primary }),
        createComponent('testimonial', { quote: `"An incredible ${name.toLowerCase()} who consistently delivers outstanding results."`, author: 'Happy Client', role: 'Industry Leader', bgColor: colors.surface, textColor: colors.text, accentColor: colors.primary }),
        createComponent('cta', { heading: "Let's Work Together", subheading: 'Open to freelance and full-time opportunities.', buttonText: 'Get in Touch', bgColor: colors.bg, textColor: '#FFFFFF', accentColor: colors.primary }),
        createComponent('footer', { brand: name, copyright: `© 2026 ${name}.`, bgColor: colors.bg, textColor: '#666666', accentColor: colors.primary }),
      ];
    },
  }))),
];

// ─── BUSINESS TEMPLATES (25) ─────────────────────────────
const businessTemplates: Template[] = [
  {
    id: 'biz-agency', name: 'Digital Agency', description: 'Creative agency website',
    category: 'business', icon: 'Rocket',
    getComponents: () => [
      createComponent('navbar', { brand: 'Apex Digital', links: ['Services', 'Work', 'Team', 'Contact'], bgColor: '#0A0A0A', textColor: '#E5E5E5', accentColor: '#7C3AED' }),
      createComponent('hero', { heading: 'We Build Digital Empires', subheading: 'Full-service digital agency specializing in web design, branding, and growth marketing.', buttonText: 'Start a Project', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#7C3AED' }),
      createComponent('stats', { items: [{ value: '200+', label: 'Projects' }, { value: '50+', label: 'Clients' }, { value: '15', label: 'Awards' }], bgColor: '#111111', textColor: '#E5E5E5', accentColor: '#7C3AED' }),
      createComponent('features', { heading: 'Our Services', items: [{ title: 'Web Design', desc: 'Stunning, conversion-focused websites' }, { title: 'Branding', desc: 'Logo, identity, and brand strategy' }, { title: 'Marketing', desc: 'SEO, PPC, and social media' }, { title: 'Development', desc: 'Custom web and mobile apps' }, { title: 'Content', desc: 'Copywriting and content strategy' }, { title: 'Analytics', desc: 'Data-driven optimization' }], bgColor: '#111111', textColor: '#E5E5E5', accentColor: '#7C3AED' }),
      createComponent('testimonial', { quote: '"Apex Digital doubled our online revenue in 6 months. They\'re not just an agency, they\'re a growth partner."', author: 'Robert Chen', role: 'CEO at TechVentures', bgColor: '#0A0A0A', textColor: '#E5E5E5', accentColor: '#7C3AED' }),
      createComponent('cta', { heading: 'Ready to Grow?', subheading: 'Free strategy session for new clients.', buttonText: 'Book a Call', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#7C3AED' }),
      createComponent('footer', { brand: 'Apex Digital', copyright: '© 2026 Apex Digital Agency.', bgColor: '#050505', textColor: '#666666', accentColor: '#7C3AED' }),
    ],
  },
  {
    id: 'biz-law', name: 'Law Firm', description: 'Attorney and legal services',
    category: 'business', icon: 'Scale',
    getComponents: () => [
      createComponent('navbar', { brand: 'Morrison & Blake', links: ['Practice Areas', 'Attorneys', 'Results', 'Contact'], bgColor: '#0A0E1A', textColor: '#C5D0E6', accentColor: '#1E3A5F' }),
      createComponent('hero', { heading: 'Justice. Integrity. Results.', subheading: 'Top-rated law firm with 40+ years of experience in corporate, litigation, and intellectual property law.', buttonText: 'Free Consultation', bgColor: '#0A0E1A', textColor: '#FFFFFF', accentColor: '#3B6AA0' }),
      createComponent('features', { heading: 'Practice Areas', items: [{ title: 'Corporate Law', desc: 'M&A, compliance, and governance' }, { title: 'Litigation', desc: 'Civil and commercial disputes' }, { title: 'IP Law', desc: 'Patents, trademarks, and copyrights' }, { title: 'Real Estate', desc: 'Transactions and development' }], bgColor: '#101828', textColor: '#C5D0E6', accentColor: '#3B6AA0' }),
      createComponent('stats', { items: [{ value: '2,500+', label: 'Cases Won' }, { value: '40+', label: 'Years' }, { value: '$500M+', label: 'Recovered' }], bgColor: '#0A0E1A', textColor: '#C5D0E6', accentColor: '#3B6AA0' }),
      createComponent('testimonial', { quote: '"Morrison & Blake handled our acquisition flawlessly. Their attention to detail is unmatched."', author: 'David Park', role: 'CFO at Meridian Group', bgColor: '#101828', textColor: '#C5D0E6', accentColor: '#3B6AA0' }),
      createComponent('cta', { heading: 'Schedule a Consultation', subheading: 'First consultation is free. Call us today.', buttonText: 'Contact Us', bgColor: '#0A0E1A', textColor: '#FFFFFF', accentColor: '#3B6AA0' }),
      createComponent('footer', { brand: 'Morrison & Blake LLP', copyright: '© 2026 Morrison & Blake LLP.', bgColor: '#060A14', textColor: '#4A5568', accentColor: '#3B6AA0' }),
    ],
  },
  {
    id: 'biz-realestate', name: 'Real Estate', description: 'Property and real estate',
    category: 'business', icon: 'Home',
    getComponents: () => [
      createComponent('navbar', { brand: 'Prime Properties', links: ['Listings', 'Services', 'About', 'Contact'], bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#B8860B' }),
      createComponent('hero', { heading: 'Find Your Dream Home', subheading: 'Luxury real estate in the most desirable neighborhoods. Personal service, exceptional results.', buttonText: 'Browse Listings', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#B8860B' }),
      createComponent('stats', { items: [{ value: '$2B+', label: 'Properties Sold' }, { value: '500+', label: 'Happy Clients' }, { value: '25+', label: 'Years' }], bgColor: '#F9F7F1', textColor: '#1A1A1A', accentColor: '#B8860B' }),
      createComponent('features', { heading: 'Our Services', items: [{ title: 'Buying', desc: 'Expert guidance for home buyers' }, { title: 'Selling', desc: 'Maximum value for your property' }, { title: 'Investment', desc: 'Commercial and rental properties' }, { title: 'Relocation', desc: 'Smooth transitions to new cities' }], bgColor: '#F9F7F1', textColor: '#1A1A1A', accentColor: '#B8860B' }),
      createComponent('testimonial', { quote: '"Prime Properties found us the perfect home in our dream neighborhood. The process was seamless."', author: 'The Johnsons', role: 'Beverly Hills', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#B8860B' }),
      createComponent('cta', { heading: 'Start Your Search', subheading: 'Schedule a private showing today.', buttonText: 'Get Started', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#B8860B' }),
      createComponent('footer', { brand: 'Prime Properties', copyright: '© 2026 Prime Properties.', bgColor: '#F0EDE4', textColor: '#8B8B7A', accentColor: '#B8860B' }),
    ],
  },
  // Additional business templates
  ...(['Accounting Firm', 'Healthcare Clinic', 'Consulting Group', 'Insurance Agency', 'Financial Advisor', 'Marketing Agency', 'Construction Co', 'Tech Startup', 'Fitness Studio', 'Dental Practice', 'Veterinary Clinic', 'Auto Dealership', 'Logistics Company', 'Education Center', 'Travel Agency', 'IT Services', 'Architecture Firm', 'Photography Studio', 'Beauty Salon', 'Nonprofit Organization', 'Event Planning', 'Coworking Space'].map((name, i) => ({
    id: `biz-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    description: `${name} website`,
    category: 'business' as const,
    icon: 'Building2',
    getComponents: () => {
      const colors = [
        { primary: '#059669', bg: '#071209', surface: '#0D1E12', text: '#A7F3D0' },
        { primary: '#0EA5E9', bg: '#0B1520', surface: '#0F1D2B', text: '#BAE6FD' },
        { primary: '#8B5CF6', bg: '#13111C', surface: '#1C1929', text: '#EDE9FE' },
        { primary: '#F59E0B', bg: '#1A1706', surface: '#25210C', text: '#FEF9C3' },
        { primary: '#1E40AF', bg: '#FFFFFF', surface: '#EFF6FF', text: '#1E3A5F' },
        { primary: '#DC2626', bg: '#1A0A0A', surface: '#251010', text: '#FEE2E2' },
        { primary: '#F97316', bg: '#1A110B', surface: '#251A10', text: '#FFEDD5' },
        { primary: '#06B6D4', bg: '#0B1519', surface: '#0F1D23', text: '#CFFAFE' },
        { primary: '#EF4444', bg: '#FFFFFF', surface: '#FEF2F2', text: '#7F1D1D' },
        { primary: '#0891B2', bg: '#ECFEFF', surface: '#CFFAFE', text: '#164E63' },
        { primary: '#059669', bg: '#F0FDF4', surface: '#DCFCE7', text: '#14532D' },
        { primary: '#6366F1', bg: '#0F0F1F', surface: '#16162B', text: '#E0E7FF' },
        { primary: '#475569', bg: '#F8FAFC', surface: '#F1F5F9', text: '#1E293B' },
        { primary: '#84CC16', bg: '#0B1207', surface: '#141E0D', text: '#ECFCCB' },
        { primary: '#EC4899', bg: '#1A0B14', surface: '#25101E', text: '#FCE7F3' },
        { primary: '#3B82F6', bg: '#0B1120', surface: '#111827', text: '#DBEAFE' },
        { primary: '#14B8A6', bg: '#0B1514', surface: '#0F1F1D', text: '#CCFBF1' },
        { primary: '#A855F7', bg: '#160B22', surface: '#1F1133', text: '#F3E8FF' },
        { primary: '#D946EF', bg: '#FFFFFF', surface: '#FAF5FF', text: '#581C87' },
        { primary: '#10B981', bg: '#0D1117', surface: '#161B22', text: '#D1FAE5' },
        { primary: '#EAB308', bg: '#1A1706', surface: '#25210C', text: '#FEF9C3' },
        { primary: '#7C3AED', bg: '#FFFFFF', surface: '#F5F3FF', text: '#4C1D95' },
      ][i];
      return [
        createComponent('navbar', { brand: name, links: ['Services', 'About', 'Team', 'Contact'], bgColor: colors.bg, textColor: colors.text, accentColor: colors.primary }),
        createComponent('hero', { heading: `${name} — Excellence Delivered`, subheading: `Trusted ${name.toLowerCase()} providing exceptional service and results for over a decade.`, buttonText: 'Get Started', bgColor: colors.bg, textColor: colors.text === '#1E3A5F' || colors.text === '#7F1D1D' || colors.text === '#164E63' || colors.text === '#14532D' || colors.text === '#1E293B' || colors.text === '#581C87' || colors.text === '#4C1D95' ? colors.text : '#FFFFFF', accentColor: colors.primary }),
        createComponent('features', { heading: 'Our Services', items: [{ title: 'Consultation', desc: 'Expert advice tailored to you' }, { title: 'Implementation', desc: 'Professional execution' }, { title: 'Support', desc: 'Ongoing assistance and care' }, { title: 'Growth', desc: 'Strategies for long-term success' }], bgColor: colors.surface, textColor: colors.text, accentColor: colors.primary }),
        createComponent('stats', { items: [{ value: '500+', label: 'Clients' }, { value: '15+', label: 'Years' }, { value: '98%', label: 'Satisfaction' }], bgColor: colors.bg, textColor: colors.text, accentColor: colors.primary }),
        createComponent('testimonial', { quote: `"${name} exceeded our expectations. Professional, reliable, and truly exceptional."`, author: 'Satisfied Client', role: 'Business Owner', bgColor: colors.surface, textColor: colors.text, accentColor: colors.primary }),
        createComponent('newsletter', { heading: 'Stay Connected', placeholder: 'Enter your email', buttonText: 'Subscribe', buttonColor: colors.primary, bgColor: colors.bg, textColor: colors.text }),
        createComponent('footer', { brand: name, copyright: `© 2026 ${name}.`, bgColor: colors.bg, textColor: '#666666', accentColor: colors.primary }),
      ];
    },
  }))),
];

// ─── RESTAURANT TEMPLATES (25) ───────────────────────────
const restaurantTemplates: Template[] = [
  {
    id: 'rest-italian', name: 'Italian Fine Dining', description: 'Upscale Italian restaurant',
    category: 'restaurant', icon: 'UtensilsCrossed',
    getComponents: () => [
      createComponent('navbar', { brand: 'Trattoria Roma', links: ['Menu', 'Wine', 'About', 'Reserve'], bgColor: '#1A0A0A', textColor: '#F5E6D3', accentColor: '#8B2500' }),
      createComponent('hero', { heading: 'Authentic Italian Cuisine', subheading: 'Hand-made pasta, wood-fired pizza, and the finest Italian wines. A taste of Rome in every bite.', buttonText: 'Reserve a Table', bgColor: '#1A0A0A', textColor: '#F5E6D3', accentColor: '#8B2500' }),
      createComponent('features', { heading: 'Our Specialties', items: [{ title: 'Fresh Pasta', desc: 'Made in-house daily with imported flour' }, { title: 'Wood-Fired Pizza', desc: 'Neapolitan style at 900°F' }, { title: 'Wine Cellar', desc: '500+ labels from every Italian region' }], bgColor: '#2A1414', textColor: '#F5E6D3', accentColor: '#8B2500' }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop'], columns: 3, gap: '8px' }),
      createComponent('testimonial', { quote: '"The best Italian food outside of Italy. Every dish is a masterpiece."', author: 'Zagat Guide', role: '★★★★★', bgColor: '#1A0A0A', textColor: '#F5E6D3', accentColor: '#8B2500' }),
      createComponent('cta', { heading: 'Book Your Table', subheading: 'Open Tuesday–Sunday, 5PM–11PM', buttonText: 'Make a Reservation', bgColor: '#1A0A0A', textColor: '#F5E6D3', accentColor: '#8B2500' }),
      createComponent('footer', { brand: 'Trattoria Roma', copyright: '© 2026 Trattoria Roma.', bgColor: '#100505', textColor: '#8B7A6B', accentColor: '#8B2500' }),
    ],
  },
  {
    id: 'rest-burger', name: 'Burger Joint', description: 'Gourmet burger restaurant',
    category: 'restaurant', icon: 'UtensilsCrossed',
    getComponents: () => [
      createComponent('navbar', { brand: 'Smash Bros', links: ['Menu', 'Locations', 'About', 'Order'], bgColor: '#1A1706', textColor: '#FEF9C3', accentColor: '#EAB308' }),
      createComponent('hero', { heading: 'Smashed to Perfection', subheading: 'Premium beef, artisan buns, and secret sauces. The best smash burgers in town.', buttonText: 'Order Now', bgColor: '#1A1706', textColor: '#FFFFFF', accentColor: '#EAB308' }),
      createComponent('features', { heading: 'Our Menu', items: [{ title: 'Classic Smash', desc: 'Double patty, American cheese, pickles — $12' }, { title: 'Truffle Deluxe', desc: 'Truffle aioli, gruyère, caramelized onion — $16' }, { title: 'BBQ Bacon', desc: 'Smoked bacon, BBQ sauce, jalapeños — $14' }], bgColor: '#25210C', textColor: '#FEF9C3', accentColor: '#EAB308' }),
      createComponent('stats', { items: [{ value: '5M+', label: 'Burgers Sold' }, { value: '12', label: 'Locations' }, { value: '#1', label: 'Rated Burger' }], bgColor: '#1A1706', textColor: '#FEF9C3', accentColor: '#EAB308' }),
      createComponent('testimonial', { quote: '"Life-changing burgers. I dream about the Truffle Deluxe."', author: 'Food & Wine', role: 'Best Burger 2025', bgColor: '#25210C', textColor: '#FEF9C3', accentColor: '#EAB308' }),
      createComponent('cta', { heading: 'Hungry?', subheading: 'Order online for pickup or delivery.', buttonText: 'Order Online', bgColor: '#1A1706', textColor: '#FFFFFF', accentColor: '#EAB308' }),
      createComponent('footer', { brand: 'Smash Bros', copyright: '© 2026 Smash Bros Burgers.', bgColor: '#100E04', textColor: '#8B8A6B', accentColor: '#EAB308' }),
    ],
  },
  {
    id: 'rest-ramen', name: 'Ramen Bar', description: 'Japanese ramen restaurant',
    category: 'restaurant', icon: 'UtensilsCrossed',
    getComponents: () => [
      createComponent('navbar', { brand: '麺 MENCHI', links: ['Menu', 'About', 'Gallery', 'Visit'], bgColor: '#0A0A0A', textColor: '#E5E5E5', accentColor: '#DC2626' }),
      createComponent('hero', { heading: 'Ramen. Perfected.', subheading: '48-hour bone broth. Hand-pulled noodles. A Tokyo-trained chef bringing authentic ramen to your neighborhood.', buttonText: 'See Menu', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#DC2626' }),
      createComponent('features', { heading: 'Our Bowls', items: [{ title: 'Tonkotsu', desc: '48-hour pork bone broth, chashu, egg — $16' }, { title: 'Miso', desc: 'Rich miso, ground pork, corn — $15' }, { title: 'Shoyu', desc: 'Soy-based, bamboo shoots, nori — $14' }], bgColor: '#1A1010', textColor: '#E5E5E5', accentColor: '#DC2626' }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=400&fit=crop'], columns: 3, gap: '8px' }),
      createComponent('cta', { heading: 'Visit Us', subheading: 'Open daily 11:30AM–10PM. Walk-ins welcome.', buttonText: 'Get Directions', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#DC2626' }),
      createComponent('footer', { brand: '麺 MENCHI', copyright: '© 2026 MENCHI Ramen.', bgColor: '#050505', textColor: '#666666', accentColor: '#DC2626' }),
    ],
  },
  {
    id: 'rest-vegan', name: 'Vegan Café', description: 'Plant-based restaurant',
    category: 'restaurant', icon: 'Leaf',
    getComponents: () => [
      createComponent('navbar', { brand: 'Green Soul', links: ['Menu', 'Philosophy', 'Events', 'Order'], bgColor: '#F0FDF4', textColor: '#14532D', accentColor: '#16A34A' }),
      createComponent('hero', { heading: 'Plant-Powered Dining', subheading: '100% plant-based cuisine that proves vegan food can be extraordinary. Organic, local, sustainable.', buttonText: 'View Menu', bgColor: '#F0FDF4', textColor: '#14532D', accentColor: '#16A34A' }),
      createComponent('features', { heading: 'Our Philosophy', items: [{ title: '100% Plant-Based', desc: 'Every dish is completely vegan' }, { title: 'Organic & Local', desc: 'Sourced from local organic farms' }, { title: 'Zero Waste', desc: 'Committed to sustainability' }], bgColor: '#DCFCE7', textColor: '#14532D', accentColor: '#16A34A' }),
      createComponent('stats', { items: [{ value: '100%', label: 'Plant-Based' }, { value: '90%', label: 'Organic' }, { value: '0', label: 'Food Waste' }], bgColor: '#F0FDF4', textColor: '#14532D', accentColor: '#16A34A' }),
      createComponent('testimonial', { quote: '"I\'m not even vegan and this is my favorite restaurant. The flavors are incredible."', author: 'The New York Times', role: 'Restaurant Review', bgColor: '#DCFCE7', textColor: '#14532D', accentColor: '#16A34A' }),
      createComponent('cta', { heading: 'Order Online', subheading: 'Delivery and pickup available daily.', buttonText: 'Start Order', bgColor: '#F0FDF4', textColor: '#14532D', accentColor: '#16A34A' }),
      createComponent('footer', { brand: 'Green Soul', copyright: '© 2026 Green Soul Café.', bgColor: '#BBF7D0', textColor: '#166534', accentColor: '#16A34A' }),
    ],
  },
  {
    id: 'rest-steakhouse', name: 'Steakhouse', description: 'Premium steakhouse',
    category: 'restaurant', icon: 'UtensilsCrossed',
    getComponents: () => [
      createComponent('navbar', { brand: "EMBER", links: ['Menu', 'Wine List', 'Private Dining', 'Reserve'], bgColor: '#0A0A0A', textColor: '#D4A574', accentColor: '#B8860B' }),
      createComponent('hero', { heading: 'The Art of Steak', subheading: 'USDA Prime dry-aged steaks, an award-winning wine program, and impeccable service.', buttonText: 'Reserve Now', bgColor: '#0A0A0A', textColor: '#D4A574', accentColor: '#B8860B' }),
      createComponent('features', { heading: 'Signature Cuts', items: [{ title: 'Ribeye 16oz', desc: 'Dry-aged 45 days, bone-in — $68' }, { title: 'Filet Mignon', desc: 'Center-cut, butter-tender — $62' }, { title: 'Tomahawk', desc: '32oz long-bone ribeye for two — $120' }], bgColor: '#1A1408', textColor: '#D4A574', accentColor: '#B8860B' }),
      createComponent('stats', { items: [{ value: '45 days', label: 'Dry Aged' }, { value: 'USDA', label: 'Prime Grade' }, { value: '500+', label: 'Wine Labels' }], bgColor: '#0A0A0A', textColor: '#D4A574', accentColor: '#B8860B' }),
      createComponent('testimonial', { quote: '"The finest steakhouse experience. Every visit feels like a celebration."', author: 'Michelin Guide', role: '★★', bgColor: '#1A1408', textColor: '#D4A574', accentColor: '#B8860B' }),
      createComponent('cta', { heading: 'An Unforgettable Evening', subheading: 'Private dining available for groups of 10-50.', buttonText: 'Book Private Dining', bgColor: '#0A0A0A', textColor: '#D4A574', accentColor: '#B8860B' }),
      createComponent('footer', { brand: 'EMBER Steakhouse', copyright: '© 2026 EMBER.', bgColor: '#050505', textColor: '#6B5B40', accentColor: '#B8860B' }),
    ],
  },
  // Additional restaurant templates
  ...(['Sushi Bar', 'Mexican Cantina', 'French Bistro', 'Pizza Place', 'Thai Kitchen', 'Indian Restaurant', 'BBQ Smokehouse', 'Seafood Grill', 'Chinese Restaurant', 'Mediterranean', 'Bakery & Pastry', 'Coffee House', 'Ice Cream Shop', 'Taco Truck', 'Wine Bar', 'Cocktail Lounge', 'Brunch Spot', 'Food Truck', 'Poke Bowl', 'Korean BBQ'].map((name, i) => ({
    id: `rest-${name.toLowerCase().replace(/[\s&]+/g, '-')}`,
    name,
    description: `${name} website`,
    category: 'restaurant' as const,
    icon: 'UtensilsCrossed',
    getComponents: () => {
      const colors = [
        { primary: '#DC2626', bg: '#0A0A0A', surface: '#1A1010', text: '#FEE2E2' },
        { primary: '#F59E0B', bg: '#1A1706', surface: '#25210C', text: '#FEF9C3' },
        { primary: '#7C3AED', bg: '#13111C', surface: '#1C1929', text: '#EDE9FE' },
        { primary: '#EF4444', bg: '#FFFFFF', surface: '#FEF2F2', text: '#7F1D1D' },
        { primary: '#F97316', bg: '#1A110B', surface: '#251A10', text: '#FFEDD5' },
        { primary: '#EAB308', bg: '#1A1706', surface: '#25210C', text: '#FEF9C3' },
        { primary: '#B45309', bg: '#1A110B', surface: '#25180B', text: '#FFEDD5' },
        { primary: '#0EA5E9', bg: '#0B1520', surface: '#0F1D2B', text: '#BAE6FD' },
        { primary: '#DC2626', bg: '#1A0505', surface: '#250A0A', text: '#FEE2E2' },
        { primary: '#14B8A6', bg: '#0B1514', surface: '#0F1F1D', text: '#CCFBF1' },
        { primary: '#D946EF', bg: '#FFF5FB', surface: '#FAE8FF', text: '#701A75' },
        { primary: '#92400E', bg: '#FFFBEB', surface: '#FEF3C7', text: '#451A03' },
        { primary: '#EC4899', bg: '#FFF1F2', surface: '#FCE7F3', text: '#831843' },
        { primary: '#84CC16', bg: '#0B1207', surface: '#141E0D', text: '#ECFCCB' },
        { primary: '#7C3AED', bg: '#1A0A1A', surface: '#25102A', text: '#F3E8FF' },
        { primary: '#111827', bg: '#0A0A0A', surface: '#1A1A1A', text: '#E5E5E5' },
        { primary: '#F59E0B', bg: '#FFFBEB', surface: '#FEF3C7', text: '#78350F' },
        { primary: '#10B981', bg: '#0D1117', surface: '#161B22', text: '#D1FAE5' },
        { primary: '#06B6D4', bg: '#0B1519', surface: '#0F1D23', text: '#CFFAFE' },
        { primary: '#EF4444', bg: '#0A0A0A', surface: '#1A0F0F', text: '#FEE2E2' },
      ][i];
      const specialties = [
        ['Nigiri Platter', 'Dragon Roll', 'Omakase'],
        ['Street Tacos', 'Enchiladas', 'Churros'],
        ['Coq au Vin', 'Crème Brûlée', 'Bouillabaisse'],
        ['Margherita', 'Quattro Formaggi', 'Calzone'],
        ['Pad Thai', 'Green Curry', 'Tom Yum'],
        ['Butter Chicken', 'Biryani', 'Naan Bread'],
        ['Brisket', 'Pulled Pork', 'Smoked Ribs'],
        ['Lobster', 'Grilled Salmon', 'Shrimp Scampi'],
        ['Dim Sum', 'Peking Duck', 'Kung Pao'],
        ['Hummus', 'Falafel', 'Grilled Lamb'],
        ['Croissants', 'Sourdough', 'Pastries'],
        ['Espresso', 'Cold Brew', 'Matcha Latte'],
        ['Gelato', 'Sundaes', 'Milkshakes'],
        ['Fish Tacos', 'Carnitas', 'Al Pastor'],
        ['Natural Wines', 'Cheese Board', 'Charcuterie'],
        ['Craft Cocktails', 'Small Plates', 'Tasting Menu'],
        ['Eggs Benedict', 'Pancakes', 'Avocado Toast'],
        ['Signature Bowl', 'Loaded Fries', 'Smoothies'],
        ['Tuna Poke', 'Salmon Bowl', 'Tofu Bowl'],
        ['Galbi', 'Bulgogi', 'Kimchi Stew'],
      ][i];
      return [
        createComponent('navbar', { brand: name, links: ['Menu', 'About', 'Gallery', 'Contact'], bgColor: colors.bg, textColor: colors.text, accentColor: colors.primary }),
        createComponent('hero', { heading: `Welcome to ${name}`, subheading: `Authentic flavors, warm atmosphere, and unforgettable dining. Experience the best ${name.toLowerCase()} in town.`, buttonText: 'View Menu', bgColor: colors.bg, textColor: colors.text.startsWith('#F') || colors.text.startsWith('#E') || colors.text.startsWith('#D') || colors.text.startsWith('#C') || colors.text.startsWith('#B') || colors.text.startsWith('#A') ? '#FFFFFF' : colors.text, accentColor: colors.primary }),
        createComponent('features', { heading: 'Our Specialties', items: specialties.map(s => ({ title: s, desc: 'Crafted with the finest ingredients' })), bgColor: colors.surface, textColor: colors.text, accentColor: colors.primary }),
        createComponent('gallery', { images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop'], columns: 3, gap: '8px' }),
        createComponent('testimonial', { quote: `"The best ${name.toLowerCase()} experience. Absolutely worth every visit."`, author: 'Local Food Guide', role: '★★★★★', bgColor: colors.bg, textColor: colors.text, accentColor: colors.primary }),
        createComponent('cta', { heading: 'Reserve Your Table', subheading: 'Walk-ins welcome. Reservations recommended on weekends.', buttonText: 'Book Now', bgColor: colors.bg, textColor: colors.text.startsWith('#F') || colors.text.startsWith('#E') || colors.text.startsWith('#D') || colors.text.startsWith('#C') || colors.text.startsWith('#B') || colors.text.startsWith('#A') ? '#FFFFFF' : colors.text, accentColor: colors.primary }),
        createComponent('footer', { brand: name, copyright: `© 2026 ${name}.`, bgColor: colors.bg, textColor: '#666666', accentColor: colors.primary }),
      ];
    },
  }))),
];

// ─── FACTORY for new categories ──────────────────────────
function makeCategory(
  catId: TemplateCategory,
  prefix: string,
  names: string[],
  icon: string,
  colorSets: { primary: string; bg: string; surface: string; text: string }[],
  sectionWord: string,
  ctaHeading: string,
  ctaSub: string,
): Template[] {
  return names.map((name, i) => {
    const c = colorSets[i % colorSets.length];
    const isLight = c.text.match(/^#[0-7]/);
    const heroText = isLight ? c.text : '#FFFFFF';
    const colors = { bg: c.bg, text: c.text, accent: c.primary, surface: c.surface };
    return {
      id: `${prefix}-${name.toLowerCase().replace(/[\s&']+/g, '-')}`,
      name,
      description: `${name} — ${catId} template`,
      category: catId,
      icon,
      getComponents: () => [
        createComponent('navbar', { brand: name, links: ['Home', 'Services', 'About', 'Contact'], bgColor: c.bg, textColor: c.text, accentColor: c.primary }),
        createComponent('hero', { heading: name, subheading: `Premium ${sectionWord} services crafted with care and expertise.`, buttonText: 'Learn More', bgColor: c.bg, textColor: heroText, accentColor: c.primary }),
        createComponent('features', { heading: `Why ${name}`, items: [{ title: 'Expert Team', desc: 'Experienced professionals at your service' }, { title: 'Quality First', desc: 'We never compromise on standards' }, { title: 'Custom Solutions', desc: 'Tailored to your specific needs' }, { title: 'Results Driven', desc: 'Measurable outcomes guaranteed' }], bgColor: c.surface, textColor: c.text, accentColor: c.primary }),
        createComponent('stats', { items: [{ value: '500+', label: 'Happy Clients' }, { value: '10+', label: 'Years Experience' }, { value: '98%', label: 'Satisfaction' }], bgColor: c.bg, textColor: c.text, accentColor: c.primary }),
        createComponent('testimonial', { quote: `"${name} exceeded all our expectations. Truly outstanding service."`, author: 'Satisfied Customer', role: '★★★★★', bgColor: c.surface, textColor: c.text, accentColor: c.primary }),
        createComponent('cta', { heading: ctaHeading, subheading: ctaSub, buttonText: 'Get Started', bgColor: c.bg, textColor: heroText, accentColor: c.primary }),
        createComponent('footer', { brand: name, copyright: `© 2026 ${name}.`, bgColor: c.bg, textColor: '#666666', accentColor: c.primary }),
      ],
      getPages: (): SitePage[] => generateTemplatePages(name, sectionWord, colors),
    };
  });
}

const CAT_COLORS: { primary: string; bg: string; surface: string; text: string }[] = [
  { primary: '#8B5CF6', bg: '#13111C', surface: '#1C1929', text: '#EDE9FE' },
  { primary: '#06B6D4', bg: '#0B1519', surface: '#0F1D23', text: '#CFFAFE' },
  { primary: '#F59E0B', bg: '#1A1706', surface: '#25210C', text: '#FEF9C3' },
  { primary: '#EC4899', bg: '#1A0B14', surface: '#25101E', text: '#FCE7F3' },
  { primary: '#10B981', bg: '#071209', surface: '#0D1E12', text: '#D1FAE5' },
  { primary: '#3B82F6', bg: '#0B1120', surface: '#111827', text: '#DBEAFE' },
  { primary: '#EF4444', bg: '#1A0A0A', surface: '#251010', text: '#FEE2E2' },
  { primary: '#14B8A6', bg: '#0B1514', surface: '#0F1F1D', text: '#CCFBF1' },
  { primary: '#F97316', bg: '#1A110B', surface: '#251A10', text: '#FFEDD5' },
  { primary: '#6366F1', bg: '#0F0F1F', surface: '#16162B', text: '#E0E7FF' },
  { primary: '#D946EF', bg: '#1A0B1F', surface: '#25112E', text: '#FAE8FF' },
  { primary: '#84CC16', bg: '#0B1207', surface: '#141E0D', text: '#ECFCCB' },
  { primary: '#0EA5E9', bg: '#0B1520', surface: '#0F1D2B', text: '#BAE6FD' },
  { primary: '#F43F5E', bg: '#1A0B0F', surface: '#25101A', text: '#FFE4E6' },
  { primary: '#A855F7', bg: '#160B22', surface: '#1F1133', text: '#F3E8FF' },
  { primary: '#DC2626', bg: '#0A0A0A', surface: '#1A1010', text: '#FEE2E2' },
  { primary: '#059669', bg: '#071209', surface: '#0D1E12', text: '#A7F3D0' },
  { primary: '#B8860B', bg: '#FFFFFF', surface: '#F9F7F1', text: '#1A1A1A' },
  { primary: '#1E40AF', bg: '#FFFFFF', surface: '#EFF6FF', text: '#1E3A5F' },
  { primary: '#0891B2', bg: '#ECFEFF', surface: '#CFFAFE', text: '#164E63' },
  { primary: '#16A34A', bg: '#F0FDF4', surface: '#DCFCE7', text: '#14532D' },
  { primary: '#475569', bg: '#F8FAFC', surface: '#F1F5F9', text: '#1E293B' },
  { primary: '#92400E', bg: '#FFFBEB', surface: '#FEF3C7', text: '#451A03' },
  { primary: '#7C3AED', bg: '#0F0B1A', surface: '#1A1425', text: '#E2DFF0' },
  { primary: '#2563EB', bg: '#0A0E1A', surface: '#101828', text: '#BFDBFE' },
];

const wellnessTemplates = makeCategory('wellness', 'well', [
  'Serene Spa', 'Mindful Living', 'Healing Touch', 'Zen Retreat', 'Pure Bliss Spa',
  'Harmony Wellness', 'Soul Balance', 'Calm Waters', 'Inner Peace Center', 'Lotus Wellness',
  'Radiant Glow', 'Tranquil Minds', 'Wellness Haven', 'Body & Soul', 'Spirit Rise',
  'Deep Relax', 'Aura Healing', 'Nature Therapy', 'Crystal Clear Spa', 'Vital Flow',
  'Oasis Wellness', 'Revive Studio', 'Breathe Easy', 'Sacred Space', 'Golden Hour Spa',
], 'Sparkles', CAT_COLORS, 'wellness', 'Book Your Session', 'Start your journey to inner peace today.');

const fitnessTemplates = makeCategory('fitness', 'fit', [
  'Iron Gym', 'Peak Performance', 'FitLife Studio', 'CrossTrain Pro', 'Muscle Factory',
  'Cardio Zone', 'Flex Fitness', 'Power House', 'Elite Athletics', 'Transform Gym',
  'Circuit Lab', 'Strong Nation', 'Endurance Hub', 'Beast Mode', 'Vitality Fitness',
  'Core Strength', 'Athletic Edge', 'Sweat Studio', 'Warrior Fitness', 'Burn Club',
  'Motion Gym', 'Rise & Grind', 'Titan Fitness', 'Pulse Gym', 'Victory Fitness',
], 'Dumbbell', CAT_COLORS, 'fitness', 'Start Training Today', 'First session free. No commitment required.');

const travelTemplates = makeCategory('travel', 'trav', [
  'Wanderlust Tours', 'Globe Trotter', 'Horizon Adventures', 'Paradise Travels', 'Epic Journeys',
  'Nomad Explorer', 'Skyline Travel', 'Coastal Escapes', 'Mountain Trek', 'Safari Dreams',
  'Island Hopper', 'Cultural Routes', 'Backpack World', 'Luxury Getaways', 'Road Trip Co',
  'Oceanic Voyages', 'Alpine Adventures', 'Desert Safari', 'Tropical Paradise', 'Northern Lights',
  'Ancient Trails', 'City Explorer', 'Eco Travel', 'Sunset Cruises', 'Adventure Awaits',
], 'Plane', CAT_COLORS, 'travel', 'Plan Your Trip', 'Custom itineraries tailored to your dream vacation.');

const healthTemplates = makeCategory('health', 'hlth', [
  'CareFirst Clinic', 'Vitality Health', 'MedConnect', 'Healthy Living', 'Prime Care',
  'Wellness MD', 'Family Health', 'MindBody Clinic', 'Integrated Health', 'Precision Medicine',
  'Holistic Health', 'Healing Hands', 'Complete Care', 'LifeLine Clinic', 'Thrive Health',
  'Heart & Soul Medical', 'Bright Health', 'ProHealth Center', 'Wellness Clinic Plus', 'TotalCare',
  'MedLife Solutions', 'Gentle Care', 'Advanced Health', 'NatureMed', 'BodyWise Clinic',
], 'Heart', CAT_COLORS, 'healthcare', 'Schedule an Appointment', 'Your health is our priority. Book today.');

const educationTemplates = makeCategory('education', 'edu', [
  'LearnSphere', 'EduPro Academy', 'BrightMinds', 'SkillForge', 'Knowledge Hub',
  'MasterClass Pro', 'StudyPath', 'CourseWave', 'TutorConnect', 'AcademyX',
  'Digital Learning', 'SmartEd', 'UpSkill Now', 'BookWorm Academy', 'TeachFlow',
  'Mentor Pro', 'ClassRoom Plus', 'Learning Tree', 'EduVault', 'Scholar Hub',
  'IntelliLearn', 'CampusBridge', 'StudyLab', 'CourseCraft', 'WisdomPath',
], 'GraduationCap', CAT_COLORS, 'education', 'Enroll Today', 'Start learning from world-class instructors.');

const realestateTemplates = makeCategory('realestate', 'relt', [
  'Dream Homes', 'Urban Nest', 'Skyview Realty', 'Premier Estates', 'Keystone Properties',
  'Coastal Living', 'Metro Homes', 'Prestige Realty', 'HomeBase', 'Golden Gate Properties',
  'Summit Real Estate', 'Citadel Homes', 'Azure Estates', 'Brick & Mortar', 'Haven Properties',
  'Pinnacle Realty', 'Landmark Homes', 'Horizon Estates', 'Foundation Realty', 'Elite Properties',
  'Cornerstone Homes', 'Infinity Realty', 'Sterling Estates', 'Oak Tree Properties', 'Crestview Homes',
], 'Home', CAT_COLORS, 'real estate', 'Find Your Dream Home', 'Schedule a private showing today.');

const eventTemplates = makeCategory('event', 'evt', [
  'Grand Events', 'Celebrate Co', 'Eventful', 'Party Planner Pro', 'Gala Events',
  'Momentous', 'Festiva', 'Conference Hub', 'Summit Events', 'VIP Gatherings',
  'Epic Events', 'Milestone Planners', 'Spotlight Events', 'Bliss Events', 'Dream Day',
  'EventCraft', 'Jubilee', 'Grand Stage', 'Fete & Feast', 'Occasions Plus',
  'Premiere Events', 'Celestial Celebrations', 'CheerFest', 'Harmony Events', 'Extravaganza',
], 'Calendar', CAT_COLORS, 'event planning', 'Plan Your Event', 'From concept to execution, we handle everything.');

const fashionTemplates = makeCategory('fashion', 'fash', [
  'Luxe Label', 'Vogue Studio', 'Chic Boutique', 'Runway Ready', 'Trend Setter',
  'Haute Couture', 'Style & Grace', 'Fashion Forward', 'Glamour House', 'Silk & Thread',
  'Dressed Up', 'Urban Threads', 'Elegant Edge', 'Bold & Beautiful', 'Couture Collective',
  'Stitch Perfect', 'Fashion Vault', 'Wardrobe Edit', 'Velvet Rose', 'Modern Muse',
  'The Style Bar', 'Prêt-à-Porter', 'Thread & Needle', 'Opulent', 'Golden Stitch',
], 'ShoppingBag', CAT_COLORS, 'fashion', 'Shop the Collection', 'New arrivals dropping every week.');

const hotelTemplates = makeCategory('hotel', 'htl', [
  'Grand Palace', 'Seaside Resort', 'Mountain Lodge', 'Urban Boutique', 'Luxury Suites',
  'Sunset Inn', 'Heritage Hotel', 'Sky Lounge Hotel', 'Oasis Resort', 'The Grand',
  'Riverside Hotel', 'Tropical Paradise', 'Alpine Retreat', 'Crystal Bay Resort', 'Pearl Hotel',
  'Golden Sands', 'The Manor', 'Starlight Hotel', 'Emerald Resort', 'Royal Palace',
  'Harbor View', 'Cedar Lodge', 'Sapphire Suites', 'Ivory Tower', 'Crescent Hotel',
], 'Building', CAT_COLORS, 'hospitality', 'Book Your Stay', 'Exclusive rates available for direct bookings.');

const nonprofitTemplates = makeCategory('nonprofit', 'npo', [
  'Hope Foundation', 'Green Earth', 'Care Alliance', 'Bright Future', 'Helping Hands',
  'Unity Project', 'Change Makers', 'Heart & Hope', 'Give Forward', 'Compassion Corps',
  'Global Aid', 'Kindness First', 'Community Lift', 'Seeds of Hope', 'Better Tomorrow',
  'Impact Network', 'Beacon of Light', 'Open Arms', 'PathFinders', 'Humanity First',
  'Uplift Foundation', 'Roots & Wings', 'Mission Possible', 'Safe Haven', 'Bridge Builders',
], 'Heart', CAT_COLORS, 'charitable', 'Make a Donation', 'Every contribution makes a difference.');

const agencyTemplates = makeCategory('agency', 'agcy', [
  'Creative Pulse', 'Pixel Storm', 'BrandForge', 'Studio Nine', 'Spark Agency',
  'Canvas Creative', 'Neon Agency', 'Artistry Co', 'Design Lab', 'Visual Edge',
  'Craft Studio', 'Mojo Agency', 'Prism Creative', 'Atomic Design', 'Flow Agency',
  'Blueprint Studio', 'Elevate Creative', 'Fusion Agency', 'Kinetic Design', 'Nova Studio',
  'Quantum Creative', 'Ripple Agency', 'Vector Studio', 'Zenith Creative', 'Apex Studio',
], 'Palette', CAT_COLORS, 'creative', 'Start a Project', 'Let\'s bring your vision to life.');

const techlandingTemplates = makeCategory('techlanding', 'tl', [
  'LaunchPad', 'AppLift', 'TechVibe', 'Rocket Launch', 'Product Hunt Pro',
  'BetaReady', 'FeatureScope', 'NexGen Product', 'DevLaunch', 'StartupKit',
  'ProductForge', 'MicroSaaS', 'AppCraft', 'TechDrop', 'InnoLaunch',
  'QuickShip', 'MVP Builder', 'LaunchDay', 'ProductPeak', 'TechForward',
  'RapidLaunch', 'ScaleUp', 'GrowthEngine', 'Ignition', 'Catalyst',
], 'Rocket', CAT_COLORS, 'technology', 'Get Early Access', 'Be the first to try our product.');

const foodbevTemplates = makeCategory('foodbev', 'fb', [
  'Craft Brewery', 'Artisan Bakery', 'Organic Market', 'Juice Bar', 'Tea House',
  'Chocolate Factory', 'Wine Estate', 'Farmer\'s Market', 'Gourmet Kitchen', 'Smoothie Bar',
  'Coffee Roasters', 'Pastry Palace', 'Cheese Shop', 'Spice Market', 'Ice Cream Parlor',
  'Kombucha Co', 'Honey Farm', 'Olive Oil Co', 'Sourdough Studio', 'Matcha Lab',
  'Cider House', 'Distillery', 'Candy Shop', 'Popcorn Factory', 'Pretzel Place',
], 'UtensilsCrossed', CAT_COLORS, 'food & beverage', 'Order Now', 'Fresh, handcrafted products delivered to your door.');

// ─── BLANK TEMPLATE ──────────────────────────────────────
const blankTemplate: Template = {
  id: 'blank', name: 'Blank Canvas', description: 'Start from scratch with drag & drop',
  category: 'saas', icon: 'FileText',
  getComponents: () => [],
};

// ─── COMBINED EXPORTS ────────────────────────────────────
export const templates: Template[] = [
  blankTemplate,
  ...saasTemplates,
  ...portfolioTemplates,
  ...businessTemplates,
  ...restaurantTemplates,
  ...wellnessTemplates,
  ...fitnessTemplates,
  ...travelTemplates,
  ...healthTemplates,
  ...educationTemplates,
  ...realestateTemplates,
  ...eventTemplates,
  ...fashionTemplates,
  ...hotelTemplates,
  ...nonprofitTemplates,
  ...agencyTemplates,
  ...techlandingTemplates,
  ...foodbevTemplates,
];

export function getTemplatesByCategory(category: string): Template[] {
  if (category === 'all') return templates.filter(t => t.id !== 'blank');
  return templates.filter(t => t.category === category && t.id !== 'blank');
}

export function getTemplate(id: string) {
  const tpl = templates.find(t => t.id === id);
  if (!tpl) return { components: [], category: 'saas' as TemplateCategory, pages: [] as SitePage[] };
  const comps = tpl.getComponents();
  let pages: SitePage[] = [];
  if (tpl.getPages) {
    pages = tpl.getPages();
  } else if (tpl.id !== 'blank') {
    const navbar = comps.find((c: any) => c.type === 'navbar');
    const brand = navbar?.props?.brand || tpl.name;
    const bg = navbar?.props?.bgColor || '#0A0A0A';
    const text = navbar?.props?.textColor || '#FFFFFF';
    const accent = navbar?.props?.accentColor || '#7C3AED';
    pages = generateDefaultPages(brand, { bg, text, accent });
  }
  return { components: comps, category: tpl.category, pages };
}

export const categoryMap: Record<string, string> = {
  blank: 'saas',
};
templates.forEach(t => { categoryMap[t.id] = t.category; });
