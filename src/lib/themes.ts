export interface Theme {
  id: string;
  name: string;
  category: string;
  primary: string;
  bg: string;
  surface: string;
  text: string;
  secondary: string;
  is_custom?: boolean;
}

const saasThemes: Theme[] = [
  { id: 's1', name: 'Deep Purple', category: 'saas', primary: '#7C3AED', bg: '#0F0B1A', surface: '#1A1425', text: '#E2DFF0', secondary: '#A78BFA' },
  { id: 's2', name: 'Electric Blue', category: 'saas', primary: '#3B82F6', bg: '#0B1120', surface: '#111827', text: '#DBEAFE', secondary: '#60A5FA' },
  { id: 's3', name: 'Neon Cyan', category: 'saas', primary: '#06B6D4', bg: '#0B1519', surface: '#0F1D23', text: '#CFFAFE', secondary: '#22D3EE' },
  { id: 's4', name: 'Hot Pink', category: 'saas', primary: '#EC4899', bg: '#1A0B14', surface: '#25101E', text: '#FCE7F3', secondary: '#F472B6' },
  { id: 's5', name: 'Lime Hacker', category: 'saas', primary: '#84CC16', bg: '#0B1207', surface: '#141E0D', text: '#ECFCCB', secondary: '#A3E635' },
  { id: 's6', name: 'Solar Orange', category: 'saas', primary: '#F97316', bg: '#1A110B', surface: '#251A10', text: '#FFEDD5', secondary: '#FB923C' },
  { id: 's7', name: 'Indigo Mist', category: 'saas', primary: '#6366F1', bg: '#0F0F1F', surface: '#16162B', text: '#E0E7FF', secondary: '#818CF8' },
  { id: 's8', name: 'Minimal White', category: 'saas', primary: '#111827', bg: '#FFFFFF', surface: '#F9FAFB', text: '#111827', secondary: '#6B7280' },
  { id: 's9', name: 'Arctic', category: 'saas', primary: '#0EA5E9', bg: '#F0F9FF', surface: '#E0F2FE', text: '#0C4A6E', secondary: '#38BDF8' },
  { id: 's10', name: 'Violet Storm', category: 'saas', primary: '#8B5CF6', bg: '#13111C', surface: '#1C1929', text: '#EDE9FE', secondary: '#A78BFA' },
  { id: 's11', name: 'Matrix Green', category: 'saas', primary: '#22C55E', bg: '#050F0A', surface: '#0A1A12', text: '#DCFCE7', secondary: '#4ADE80' },
  { id: 's12', name: 'Rose Quartz', category: 'saas', primary: '#F43F5E', bg: '#FFF1F2', surface: '#FFE4E6', text: '#881337', secondary: '#FB7185' },
  { id: 's13', name: 'Steel Blue', category: 'saas', primary: '#475569', bg: '#F8FAFC', surface: '#F1F5F9', text: '#1E293B', secondary: '#64748B' },
  { id: 's14', name: 'Sunset Gold', category: 'saas', primary: '#EAB308', bg: '#1A1706', surface: '#25210C', text: '#FEF9C3', secondary: '#FACC15' },
  { id: 's15', name: 'Cobalt Night', category: 'saas', primary: '#2563EB', bg: '#0A0E1A', surface: '#101828', text: '#BFDBFE', secondary: '#3B82F6' },
  { id: 's16', name: 'Grape Soda', category: 'saas', primary: '#A855F7', bg: '#160B22', surface: '#1F1133', text: '#F3E8FF', secondary: '#C084FC' },
  { id: 's17', name: 'Crimson Dark', category: 'saas', primary: '#DC2626', bg: '#1A0A0A', surface: '#251010', text: '#FEE2E2', secondary: '#EF4444' },
  { id: 's18', name: 'Glacier', category: 'saas', primary: '#0891B2', bg: '#ECFEFF', surface: '#CFFAFE', text: '#164E63', secondary: '#06B6D4' },
  { id: 's19', name: 'Midnight Teal', category: 'saas', primary: '#14B8A6', bg: '#0B1514', surface: '#0F1F1D', text: '#CCFBF1', secondary: '#2DD4BF' },
  { id: 's20', name: 'Amber Wave', category: 'saas', primary: '#D97706', bg: '#1A1408', surface: '#251E0E', text: '#FDE68A', secondary: '#F59E0B' },
  { id: 's21', name: 'Navy Pro', category: 'saas', primary: '#1E40AF', bg: '#FFFFFF', surface: '#EFF6FF', text: '#1E3A5F', secondary: '#3B82F6' },
  { id: 's22', name: 'Aurora', category: 'saas', primary: '#10B981', bg: '#0D1117', surface: '#161B22', text: '#D1FAE5', secondary: '#34D399' },
  { id: 's23', name: 'Forest Night', category: 'saas', primary: '#059669', bg: '#071209', surface: '#0D1E12', text: '#A7F3D0', secondary: '#10B981' },
  { id: 's24', name: 'Warm Sand', category: 'saas', primary: '#B45309', bg: '#FFFBEB', surface: '#FEF3C7', text: '#78350F', secondary: '#D97706' },
  { id: 's25', name: 'Slate Pro', category: 'saas', primary: '#334155', bg: '#F8FAFC', surface: '#E2E8F0', text: '#0F172A', secondary: '#475569' },
];

const portfolioThemes: Theme[] = [
  { id: 'p1', name: 'Dark Studio', category: 'portfolio', primary: '#F59E0B', bg: '#0A0A0A', surface: '#141414', text: '#E5E5E5', secondary: '#FBBF24' },
  { id: 'p2', name: 'Monochrome', category: 'portfolio', primary: '#FFFFFF', bg: '#000000', surface: '#111111', text: '#D4D4D4', secondary: '#A3A3A3' },
  { id: 'p3', name: 'Charcoal', category: 'portfolio', primary: '#F97316', bg: '#1C1917', surface: '#292524', text: '#E7E5E4', secondary: '#FB923C' },
  { id: 'p4', name: 'Cream & Brown', category: 'portfolio', primary: '#92400E', bg: '#FFFBEB', surface: '#FEF3C7', text: '#451A03', secondary: '#B45309' },
  { id: 'p5', name: 'Ocean Deep', category: 'portfolio', primary: '#0284C7', bg: '#0C1222', surface: '#111B30', text: '#BAE6FD', secondary: '#0EA5E9' },
  { id: 'p6', name: 'Mint Fresh', category: 'portfolio', primary: '#059669', bg: '#F0FDF4', surface: '#DCFCE7', text: '#14532D', secondary: '#10B981' },
  { id: 'p7', name: 'Noir', category: 'portfolio', primary: '#E11D48', bg: '#09090B', surface: '#18181B', text: '#FAFAFA', secondary: '#F43F5E' },
  { id: 'p8', name: 'Dusty Rose', category: 'portfolio', primary: '#BE185D', bg: '#FFF1F2', surface: '#FCE7F3', text: '#831843', secondary: '#EC4899' },
  { id: 'p9', name: 'Teal Breeze', category: 'portfolio', primary: '#0D9488', bg: '#F0FDFA', surface: '#CCFBF1', text: '#134E4A', secondary: '#14B8A6' },
  { id: 'p10', name: 'Purple Haze', category: 'portfolio', primary: '#7C3AED', bg: '#0F0520', surface: '#1A0D30', text: '#DDD6FE', secondary: '#8B5CF6' },
  { id: 'p11', name: 'Ink & Paper', category: 'portfolio', primary: '#1F2937', bg: '#FAFAF9', surface: '#F5F5F4', text: '#1C1917', secondary: '#6B7280' },
  { id: 'p12', name: 'Neon Nights', category: 'portfolio', primary: '#E879F9', bg: '#0A0118', surface: '#150525', text: '#F5D0FE', secondary: '#D946EF' },
  { id: 'p13', name: 'Sage', category: 'portfolio', primary: '#4D7C0F', bg: '#FEFCE8', surface: '#ECFCCB', text: '#365314', secondary: '#65A30D' },
  { id: 'p14', name: 'Warm Ivory', category: 'portfolio', primary: '#A16207', bg: '#FEFDF0', surface: '#FEF9C3', text: '#713F12', secondary: '#CA8A04' },
  { id: 'p15', name: 'Sunset Glow', category: 'portfolio', primary: '#EA580C', bg: '#1A0E08', surface: '#2A1810', text: '#FED7AA', secondary: '#F97316' },
  { id: 'p16', name: 'Blue Steel', category: 'portfolio', primary: '#2563EB', bg: '#F0F4F8', surface: '#D9E2EC', text: '#102A43', secondary: '#3B82F6' },
  { id: 'p17', name: 'Terracotta', category: 'portfolio', primary: '#C2410C', bg: '#FFF7ED', surface: '#FFEDD5', text: '#7C2D12', secondary: '#EA580C' },
  { id: 'p18', name: 'Midnight Blue', category: 'portfolio', primary: '#6366F1', bg: '#020617', surface: '#0F172A', text: '#CBD5E1', secondary: '#818CF8' },
  { id: 'p19', name: 'Lemon Drop', category: 'portfolio', primary: '#CA8A04', bg: '#FEFCE8', surface: '#FEF9C3', text: '#422006', secondary: '#EAB308' },
  { id: 'p20', name: 'Graphite', category: 'portfolio', primary: '#9333EA', bg: '#1A1A1A', surface: '#262626', text: '#D4D4D4', secondary: '#A855F7' },
  { id: 'p21', name: 'Coral Reef', category: 'portfolio', primary: '#F43F5E', bg: '#FFF1F2', surface: '#FFE4E6', text: '#9F1239', secondary: '#FB7185' },
  { id: 'p22', name: 'Deep Forest', category: 'portfolio', primary: '#15803D', bg: '#052E16', surface: '#14532D', text: '#BBF7D0', secondary: '#22C55E' },
  { id: 'p23', name: 'Pastel Dreams', category: 'portfolio', primary: '#8B5CF6', bg: '#FAF5FF', surface: '#F3E8FF', text: '#581C87', secondary: '#A78BFA' },
  { id: 'p24', name: 'Urban Grey', category: 'portfolio', primary: '#EF4444', bg: '#171717', surface: '#262626', text: '#E5E5E5', secondary: '#F87171' },
  { id: 'p25', name: 'Electric Violet', category: 'portfolio', primary: '#A855F7', bg: '#09090B', surface: '#1A1025', text: '#E9D5FF', secondary: '#C084FC' },
];

const businessThemes: Theme[] = [
  { id: 'b1', name: 'Corporate Navy', category: 'business', primary: '#1E3A5F', bg: '#FFFFFF', surface: '#F0F4F8', text: '#102A43', secondary: '#3B82F6' },
  { id: 'b2', name: 'Emerald Trust', category: 'business', primary: '#047857', bg: '#FFFFFF', surface: '#ECFDF5', text: '#064E3B', secondary: '#10B981' },
  { id: 'b3', name: 'Executive Dark', category: 'business', primary: '#D4AF37', bg: '#0F0F0F', surface: '#1A1A1A', text: '#E5E5E5', secondary: '#F5D060' },
  { id: 'b4', name: 'Sky Pro', category: 'business', primary: '#0284C7', bg: '#FFFFFF', surface: '#F0F9FF', text: '#0C4A6E', secondary: '#38BDF8' },
  { id: 'b5', name: 'Maroon Power', category: 'business', primary: '#9F1239', bg: '#FFFFFF', surface: '#FFF1F2', text: '#4C0519', secondary: '#E11D48' },
  { id: 'b6', name: 'Slate Corp', category: 'business', primary: '#334155', bg: '#F8FAFC', surface: '#E2E8F0', text: '#0F172A', secondary: '#64748B' },
  { id: 'b7', name: 'Deep Teal', category: 'business', primary: '#0F766E', bg: '#0A1615', surface: '#132B28', text: '#99F6E4', secondary: '#14B8A6' },
  { id: 'b8', name: 'Charcoal Steel', category: 'business', primary: '#6B7280', bg: '#111827', surface: '#1F2937', text: '#E5E7EB', secondary: '#9CA3AF' },
  { id: 'b9', name: 'Royal Gold', category: 'business', primary: '#B45309', bg: '#FFFBEB', surface: '#FEF3C7', text: '#78350F', secondary: '#F59E0B' },
  { id: 'b10', name: 'Ocean Corp', category: 'business', primary: '#1D4ED8', bg: '#FFFFFF', surface: '#EFF6FF', text: '#1E3A8A', secondary: '#3B82F6' },
  { id: 'b11', name: 'Olive Pro', category: 'business', primary: '#3F6212', bg: '#FEFCE8', surface: '#F7FEE7', text: '#365314', secondary: '#65A30D' },
  { id: 'b12', name: 'Burgundy', category: 'business', primary: '#7F1D1D', bg: '#FFFFFF', surface: '#FEF2F2', text: '#450A0A', secondary: '#B91C1C' },
  { id: 'b13', name: 'Frost', category: 'business', primary: '#0369A1', bg: '#F0F9FF', surface: '#E0F2FE', text: '#0C4A6E', secondary: '#0EA5E9' },
  { id: 'b14', name: 'Dark Pro', category: 'business', primary: '#8B5CF6', bg: '#09090B', surface: '#18181B', text: '#FAFAFA', secondary: '#A78BFA' },
  { id: 'b15', name: 'Mocha', category: 'business', primary: '#78350F', bg: '#FEF7ED', surface: '#FFEDD5', text: '#431407', secondary: '#C2410C' },
  { id: 'b16', name: 'Tech Indigo', category: 'business', primary: '#4338CA', bg: '#FFFFFF', surface: '#EEF2FF', text: '#312E81', secondary: '#6366F1' },
  { id: 'b17', name: 'Clean Mint', category: 'business', primary: '#0D9488', bg: '#FFFFFF', surface: '#F0FDFA', text: '#134E4A', secondary: '#2DD4BF' },
  { id: 'b18', name: 'Titanium', category: 'business', primary: '#52525B', bg: '#FAFAFA', surface: '#E4E4E7', text: '#18181B', secondary: '#71717A' },
  { id: 'b19', name: 'Cobalt Corp', category: 'business', primary: '#1E40AF', bg: '#0F172A', surface: '#1E293B', text: '#BFDBFE', secondary: '#3B82F6' },
  { id: 'b20', name: 'Warm Walnut', category: 'business', primary: '#92400E', bg: '#FFFBEB', surface: '#FDE68A', text: '#451A03', secondary: '#D97706' },
  { id: 'b21', name: 'Forest Corp', category: 'business', primary: '#166534', bg: '#F0FDF4', surface: '#DCFCE7', text: '#14532D', secondary: '#22C55E' },
  { id: 'b22', name: 'Graphite Pro', category: 'business', primary: '#D946EF', bg: '#1A1A1A', surface: '#2A2A2A', text: '#E5E5E5', secondary: '#E879F9' },
  { id: 'b23', name: 'Neptune', category: 'business', primary: '#0E7490', bg: '#FFFFFF', surface: '#ECFEFF', text: '#155E75', secondary: '#06B6D4' },
  { id: 'b24', name: 'Iron Slate', category: 'business', primary: '#475569', bg: '#0F172A', surface: '#1E293B', text: '#CBD5E1', secondary: '#94A3B8' },
  { id: 'b25', name: 'Sunset Corp', category: 'business', primary: '#EA580C', bg: '#FFFFFF', surface: '#FFF7ED', text: '#7C2D12', secondary: '#F97316' },
];

const restaurantThemes: Theme[] = [
  { id: 'r1', name: 'Warm Spice', category: 'restaurant', primary: '#DC2626', bg: '#1A0C0C', surface: '#2A1515', text: '#FEE2E2', secondary: '#EF4444' },
  { id: 'r2', name: 'Tuscany', category: 'restaurant', primary: '#B45309', bg: '#FFFBEB', surface: '#FEF3C7', text: '#78350F', secondary: '#D97706' },
  { id: 'r3', name: 'Midnight Dine', category: 'restaurant', primary: '#D4AF37', bg: '#0A0A0A', surface: '#171717', text: '#E5E5E5', secondary: '#F5D060' },
  { id: 'r4', name: 'Saffron', category: 'restaurant', primary: '#EAB308', bg: '#1A1606', surface: '#2A240D', text: '#FEF9C3', secondary: '#FACC15' },
  { id: 'r5', name: 'Merlot', category: 'restaurant', primary: '#881337', bg: '#1A0812', surface: '#2A0F1E', text: '#FCE7F3', secondary: '#BE185D' },
  { id: 'r6', name: 'Forest Bistro', category: 'restaurant', primary: '#166534', bg: '#052E16', surface: '#14532D', text: '#BBF7D0', secondary: '#22C55E' },
  { id: 'r7', name: 'Charcoal Chef', category: 'restaurant', primary: '#F97316', bg: '#0F0F0F', surface: '#1F1F1F', text: '#E5E5E5', secondary: '#FB923C' },
  { id: 'r8', name: 'Cream Patisserie', category: 'restaurant', primary: '#92400E', bg: '#FEFDF0', surface: '#FEF3C7', text: '#451A03', secondary: '#B45309' },
  { id: 'r9', name: 'Teal Café', category: 'restaurant', primary: '#0D9488', bg: '#0A1615', surface: '#132B28', text: '#CCFBF1', secondary: '#14B8A6' },
  { id: 'r10', name: 'BBQ Smoke', category: 'restaurant', primary: '#C2410C', bg: '#1A0E08', surface: '#2A1810', text: '#FFEDD5', secondary: '#EA580C' },
  { id: 'r11', name: 'Lemon Zest', category: 'restaurant', primary: '#CA8A04', bg: '#FEFCE8', surface: '#FEF9C3', text: '#713F12', secondary: '#EAB308' },
  { id: 'r12', name: 'Plum Luxury', category: 'restaurant', primary: '#7E22CE', bg: '#1A0830', surface: '#2A1245', text: '#E9D5FF', secondary: '#9333EA' },
  { id: 'r13', name: 'Copper Kitchen', category: 'restaurant', primary: '#B45309', bg: '#1A1108', surface: '#2A1E10', text: '#FDE68A', secondary: '#D97706' },
  { id: 'r14', name: 'Slate Bistro', category: 'restaurant', primary: '#EF4444', bg: '#1E293B', surface: '#334155', text: '#E2E8F0', secondary: '#F87171' },
  { id: 'r15', name: 'Paprika', category: 'restaurant', primary: '#DC2626', bg: '#FEF2F2', surface: '#FEE2E2', text: '#7F1D1D', secondary: '#EF4444' },
  { id: 'r16', name: 'Olive Garden', category: 'restaurant', primary: '#4D7C0F', bg: '#F7FEE7', surface: '#ECFCCB', text: '#365314', secondary: '#65A30D' },
  { id: 'r17', name: 'Midnight Sushi', category: 'restaurant', primary: '#E11D48', bg: '#09090B', surface: '#18181B', text: '#FAFAFA', secondary: '#F43F5E' },
  { id: 'r18', name: 'Provence', category: 'restaurant', primary: '#7C3AED', bg: '#FAF5FF', surface: '#F3E8FF', text: '#581C87', secondary: '#8B5CF6' },
  { id: 'r19', name: 'Sage & Herb', category: 'restaurant', primary: '#15803D', bg: '#F0FDF4', surface: '#DCFCE7', text: '#14532D', secondary: '#22C55E' },
  { id: 'r20', name: 'Bourbon', category: 'restaurant', primary: '#92400E', bg: '#1C1207', surface: '#2A1E0E', text: '#FDE68A', secondary: '#B45309' },
  { id: 'r21', name: 'Crimson Curry', category: 'restaurant', primary: '#DC2626', bg: '#1A0808', surface: '#2A1010', text: '#FCA5A5', secondary: '#EF4444' },
  { id: 'r22', name: 'Azure Café', category: 'restaurant', primary: '#0284C7', bg: '#F0F9FF', surface: '#E0F2FE', text: '#0C4A6E', secondary: '#0EA5E9' },
  { id: 'r23', name: 'Walnut Roast', category: 'restaurant', primary: '#78350F', bg: '#1A1008', surface: '#2A1A10', text: '#FFEDD5', secondary: '#A16207' },
  { id: 'r24', name: 'Midnight Tapas', category: 'restaurant', primary: '#F59E0B', bg: '#0A0A0F', surface: '#15151F', text: '#FEF3C7', secondary: '#FBBF24' },
  { id: 'r25', name: 'Nordic Hygge', category: 'restaurant', primary: '#1E40AF', bg: '#F8FAFC', surface: '#E2E8F0', text: '#1E293B', secondary: '#3B82F6' },
];

export const allThemes: Theme[] = [...saasThemes, ...portfolioThemes, ...businessThemes, ...restaurantThemes];

export function getThemesByCategory(category: string): Theme[] {
  return allThemes.filter(t => t.category === category);
}

export function getThemeById(id: string): Theme | undefined {
  return allThemes.find(t => t.id === id);
}

export function applyThemeToComponents(components: any[], theme: Theme): any[] {
  return components.map(comp => {
    const updated = { ...comp, props: { ...comp.props } };
    if (updated.props.accentColor) updated.props.accentColor = theme.primary;
    const sectionTypes = ['hero', 'navbar', 'footer', 'stats', 'cta'];
    if (sectionTypes.includes(updated.type)) {
      updated.props.bgColor = theme.bg;
      updated.props.textColor = theme.text;
    } else {
      if (updated.props.bgColor) updated.props.bgColor = theme.surface;
    }
    if (updated.props.buttonColor) updated.props.buttonColor = theme.primary;
    if (updated.props.buttonTextColor) updated.props.buttonTextColor = theme.text;
    if (updated.props.linkColor) updated.props.linkColor = theme.primary;
    return updated;
  });
}
