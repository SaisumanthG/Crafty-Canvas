import { v4 } from './utils';

export type ComponentCategory = 'text' | 'media' | 'layout' | 'interactive' | 'sections';

export interface ComponentDef {
  type: string;
  label: string;
  category: ComponentCategory;
  icon: string;
  defaultProps: Record<string, any>;
}

export const componentRegistry: ComponentDef[] = [
  // Text
  { type: 'heading', label: 'Heading', category: 'text', icon: 'Type', defaultProps: { text: 'Heading', level: 'h2', textColor: '#FFFFFF', fontSize: '36px', fontWeight: '700', textAlign: 'left' } },
  { type: 'text', label: 'Paragraph', category: 'text', icon: 'AlignLeft', defaultProps: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', textColor: '#CCCCCC', fontSize: '16px', textAlign: 'left' } },
  { type: 'richtext', label: 'Rich Text', category: 'text', icon: 'FileText', defaultProps: { text: '<p>Rich text content with <strong>bold</strong> and <em>italic</em> support.</p>', textColor: '#CCCCCC' } },
  { type: 'link', label: 'Link', category: 'text', icon: 'Link', defaultProps: { text: 'Click here', url: '#', linkColor: '#7C3AED', fontSize: '16px' } },
  // Media
  { type: 'image', label: 'Image', category: 'media', icon: 'Image', defaultProps: { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop', alt: 'Image', width: '100%', borderRadius: '8px' } },
  { type: 'video', label: 'Video', category: 'media', icon: 'Video', defaultProps: { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: '100%', aspectRatio: '16/9' } },
  { type: 'icon', label: 'Icon', category: 'media', icon: 'Star', defaultProps: { icon: 'Star', size: '48', color: '#7C3AED' } },
  { type: 'gallery', label: 'Gallery', category: 'media', icon: 'Grid3x3', defaultProps: { images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop', 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop'], columns: 3, gap: '16px' } },
  // Layout
  { type: 'divider', label: 'Divider', category: 'layout', icon: 'Minus', defaultProps: { color: '#333333', thickness: '1px', margin: '24px' } },
  { type: 'spacer', label: 'Spacer', category: 'layout', icon: 'MoveVertical', defaultProps: { height: '48px' } },
  { type: 'container', label: 'Container', category: 'layout', icon: 'Square', defaultProps: { bgColor: '#1A1A1A', padding: '32px', borderRadius: '12px', maxWidth: '1200px' } },
  { type: 'columns', label: 'Columns', category: 'layout', icon: 'Columns3', defaultProps: { columns: 2, gap: '24px', bgColor: 'transparent' } },
  // Interactive
  { type: 'button', label: 'Button', category: 'interactive', icon: 'MousePointer2', defaultProps: { text: 'Click Me', buttonColor: '#7C3AED', buttonTextColor: '#FFFFFF', fontSize: '16px', padding: '12px 32px', borderRadius: '8px', url: '#' } },
  { type: 'form', label: 'Form', category: 'interactive', icon: 'FormInput', defaultProps: { fields: ['Name', 'Email', 'Message'], buttonText: 'Submit', buttonColor: '#7C3AED', bgColor: '#1A1A1A', textColor: '#FFFFFF' } },
  { type: 'newsletter', label: 'Newsletter', category: 'interactive', icon: 'Mail', defaultProps: { heading: 'Subscribe to our newsletter', placeholder: 'Enter your email', buttonText: 'Subscribe', buttonColor: '#7C3AED', bgColor: '#111111', textColor: '#FFFFFF' } },
  // Sections
  { type: 'hero', label: 'Hero', category: 'sections', icon: 'Layout', defaultProps: { heading: 'Build Something Amazing', subheading: 'Create stunning websites without writing a single line of code.', buttonText: 'Get Started', secondaryButtonText: '', buttonColor: '#7C3AED', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#7C3AED', bgImage: '', textAlign: 'center', paddingY: '100px' } },
  { type: 'features', label: 'Features', category: 'sections', icon: 'LayoutGrid', defaultProps: { heading: 'Features', items: [{ title: 'Fast', desc: 'Lightning-fast performance' }, { title: 'Secure', desc: 'Built-in security' }, { title: 'Scalable', desc: 'Grows with you' }], bgColor: '#111111', textColor: '#FFFFFF', accentColor: '#7C3AED' } },
  { type: 'testimonial', label: 'Testimonial', category: 'sections', icon: 'Quote', defaultProps: { quote: '"This product changed everything for our team."', author: 'Jane Doe', role: 'CEO at Acme', bgColor: '#0F0F0F', textColor: '#FFFFFF', accentColor: '#7C3AED' } },
  { type: 'cta', label: 'CTA', category: 'sections', icon: 'Megaphone', defaultProps: { heading: 'Ready to get started?', subheading: 'Join thousands of happy customers.', buttonText: 'Start Free Trial', buttonColor: '#7C3AED', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#7C3AED' } },
  { type: 'stats', label: 'Stats', category: 'sections', icon: 'BarChart3', defaultProps: { items: [{ value: '10K+', label: 'Users' }, { value: '99.9%', label: 'Uptime' }, { value: '24/7', label: 'Support' }], bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#7C3AED' } },
  { type: 'pricing', label: 'Pricing', category: 'sections', icon: 'DollarSign', defaultProps: { heading: 'Simple Pricing', plans: [{ name: 'Starter', price: '$9', features: ['1 Site', '1GB Storage', 'Email Support'] }, { name: 'Pro', price: '$29', features: ['10 Sites', '10GB Storage', 'Priority Support'], highlighted: true }, { name: 'Enterprise', price: '$99', features: ['Unlimited', '100GB Storage', '24/7 Support'] }], bgColor: '#111111', textColor: '#FFFFFF', accentColor: '#7C3AED' } },
  { type: 'navbar', label: 'Navbar', category: 'sections', icon: 'PanelTop', defaultProps: { brand: 'WebCraft', links: ['Home', 'Features', 'Pricing', 'Contact'], bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#7C3AED' } },
  { type: 'footer', label: 'Footer', category: 'sections', icon: 'PanelBottom', defaultProps: { brand: 'WebCraft', links: ['Privacy', 'Terms', 'Contact'], copyright: '© 2026 WebCraft. All rights reserved.', bgColor: '#0A0A0A', textColor: '#999999', accentColor: '#7C3AED' } },
];

export function getComponentsByCategory(): Record<ComponentCategory, ComponentDef[]> {
  const cats: Record<ComponentCategory, ComponentDef[]> = { text: [], media: [], layout: [], interactive: [], sections: [] };
  componentRegistry.forEach(c => cats[c.category].push(c));
  return cats;
}

export function createComponent(type: string, overrides?: Record<string, any>) {
  const def = componentRegistry.find(c => c.type === type);
  if (!def) throw new Error(`Unknown component: ${type}`);
  return {
    id: v4(),
    type: def.type,
    props: { ...def.defaultProps, ...overrides },
  };
}
