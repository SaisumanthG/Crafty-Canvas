import { createComponent } from './componentRegistry';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'saas' | 'portfolio' | 'business' | 'restaurant';
  icon: string;
  getComponents: () => any[];
}

export const templates: Template[] = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Start from scratch',
    category: 'saas',
    icon: 'FileText',
    getComponents: () => [],
  },
  {
    id: 'landing',
    name: 'SaaS Landing',
    description: 'Modern SaaS landing page',
    category: 'saas',
    icon: 'Rocket',
    getComponents: () => [
      createComponent('navbar', { brand: 'SaaSify', links: ['Features', 'Pricing', 'About', 'Contact'] }),
      createComponent('hero', { heading: 'Ship Products Faster', subheading: 'The all-in-one platform that helps teams build, deploy, and scale.' }),
      createComponent('features', { heading: 'Why Choose Us', items: [{ title: 'Lightning Fast', desc: 'Deploy in seconds, not hours' }, { title: 'Secure by Default', desc: 'Enterprise-grade security built in' }, { title: 'Scale Infinitely', desc: 'From 1 to 1 million users' }] }),
      createComponent('stats', { items: [{ value: '50K+', label: 'Users' }, { value: '99.99%', label: 'Uptime' }, { value: '150+', label: 'Countries' }] }),
      createComponent('pricing'),
      createComponent('testimonial', { quote: '"SaaSify cut our deployment time by 90%. Absolutely game-changing."', author: 'Alex Chen', role: 'CTO at TechCorp' }),
      createComponent('cta', { heading: 'Start Building Today', subheading: 'Free for teams up to 5 members. No credit card required.' }),
      createComponent('footer', { brand: 'SaaSify', copyright: '© 2026 SaaSify. All rights reserved.' }),
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Creative portfolio showcase',
    category: 'portfolio',
    icon: 'User',
    getComponents: () => [
      createComponent('navbar', { brand: 'John Doe', links: ['Work', 'About', 'Contact'] }),
      createComponent('hero', { heading: 'Creative Developer & Designer', subheading: 'I craft digital experiences that delight users and drive results.', buttonText: 'View My Work' }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1567095761054-7a02e69e5b2b?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop'] }),
      createComponent('testimonial', { quote: '"One of the most talented designers I\'ve ever worked with."', author: 'Sarah Miller', role: 'Product Lead at DesignCo' }),
      createComponent('cta', { heading: "Let's Work Together", subheading: "Have a project in mind? I'd love to hear about it.", buttonText: 'Get in Touch' }),
      createComponent('footer', { brand: 'John Doe', copyright: '© 2026 John Doe. All rights reserved.' }),
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Professional business site',
    category: 'business',
    icon: 'Building2',
    getComponents: () => [
      createComponent('navbar', { brand: 'Apex Corp', links: ['Services', 'About', 'Team', 'Contact'] }),
      createComponent('hero', { heading: 'Transform Your Business', subheading: 'Strategic consulting and innovative solutions for modern enterprises.', buttonText: 'Learn More' }),
      createComponent('features', { heading: 'Our Services', items: [{ title: 'Strategy', desc: 'Data-driven business strategies' }, { title: 'Technology', desc: 'Cutting-edge digital solutions' }, { title: 'Growth', desc: 'Sustainable growth frameworks' }] }),
      createComponent('stats', { items: [{ value: '200+', label: 'Clients' }, { value: '$50M+', label: 'Revenue Generated' }, { value: '15+', label: 'Years Experience' }] }),
      createComponent('testimonial', { quote: '"Apex transformed our operations and doubled our revenue."', author: 'Michael Ross', role: 'CEO at Global Industries' }),
      createComponent('newsletter', { heading: 'Stay Updated', placeholder: 'Your business email' }),
      createComponent('footer', { brand: 'Apex Corp', copyright: '© 2026 Apex Corp. All rights reserved.' }),
    ],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Restaurant or café website',
    category: 'restaurant',
    icon: 'UtensilsCrossed',
    getComponents: () => [
      createComponent('navbar', { brand: 'La Maison', links: ['Menu', 'About', 'Gallery', 'Reservations'] }),
      createComponent('hero', { heading: 'A Culinary Experience', subheading: 'Fine dining with locally sourced ingredients and seasonal menus.', buttonText: 'Book a Table' }),
      createComponent('features', { heading: 'Our Specialties', items: [{ title: 'Farm to Table', desc: 'Fresh, locally sourced ingredients' }, { title: 'Seasonal Menu', desc: 'New creations every season' }, { title: 'Private Events', desc: 'Exclusive dining experiences' }] }),
      createComponent('gallery', { images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop'] }),
      createComponent('testimonial', { quote: '"The best dining experience in the city. Every visit feels special."', author: 'Food & Wine Magazine', role: '' }),
      createComponent('cta', { heading: 'Make a Reservation', subheading: 'Join us for an unforgettable evening.', buttonText: 'Reserve Now' }),
      createComponent('footer', { brand: 'La Maison', copyright: '© 2026 La Maison. All rights reserved.' }),
    ],
  },
];

export function getTemplate(id: string) {
  const tpl = templates.find(t => t.id === id);
  if (!tpl) return { components: [], category: 'saas' as const };
  return { components: tpl.getComponents(), category: tpl.category };
}

export const categoryMap: Record<string, string> = {
  blank: 'saas',
  landing: 'saas',
  portfolio: 'portfolio',
  business: 'business',
  restaurant: 'restaurant',
};
