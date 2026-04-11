import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, Search, FileText, Rocket, Users, Building2, UtensilsCrossed, Layers, Check, Star, Heart, GraduationCap, Home, Calendar, ShoppingBag, Palette, Plane, Dumbbell } from 'lucide-react';
import { templates, getTemplate, getTemplatesByCategory, type Template } from '@/lib/templates';
import { getThemesByCategory, applyThemeToComponents, Theme } from '@/lib/themes';
import { createSite, serializeComponents, serializePages } from '@/lib/siteStorage';
import { ThemePicker } from '@/components/editor/ThemePicker';
import { Navbar } from '@/components/layout/Navbar';

const categories = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'saas', label: 'SaaS / Tech', icon: Rocket },
  { id: 'portfolio', label: 'Portfolio', icon: Star },
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed },
  { id: 'wellness', label: 'Wellness & Spa', icon: Sparkles },
  { id: 'fitness', label: 'Fitness & Gym', icon: Dumbbell },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'health', label: 'Health & Clinic', icon: Heart },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'realestate', label: 'Real Estate', icon: Home },
  { id: 'event', label: 'Events', icon: Calendar },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag },
  { id: 'hotel', label: 'Hotel', icon: Building2 },
  { id: 'nonprofit', label: 'Nonprofit', icon: Heart },
  { id: 'agency', label: 'Creative Agency', icon: Palette },
  { id: 'techlanding', label: 'Tech Landing', icon: Rocket },
  { id: 'foodbev', label: 'Food & Beverage', icon: UtensilsCrossed },
];

// 430+ unique real Unsplash photo IDs — every template gets its own image
const PHOTO_POOL: string[] = [
  // SaaS / Tech (30)
  '1460925895917-afdab827c52f', '1551288049-bebda4e38f71', '1519389950473-47ba0277781c',
  '1504868584819-f8e8b4b6d7e3', '1551434678-e076c223a692', '1498050108023-c5249f4df085',
  '1555066931-4365d14bab8c', '1517694712202-14dd9538aa97', '1581091226825-a6a2a5aee158',
  '1526374965328-7f61d4dc18c5', '1550751827-4bd374c3f58b', '1488590528505-98d2b5aba04b',
  '1461749280684-dccba630e2f6', '1504639725590-34d0984388bd', '1536104968055-4d61aa56f46a',
  '1573164713714-d95e436ab8d6', '1573164574572-cb89e39749b4', '1487058792275-0ad4aaf24ca7',
  '1531297484001-80022131f5a1', '1563986768609-322da13575f2', '1559028012-481c04fa702d',
  '1573495612890-430e48b164d0', '1518770660439-4636190af475', '1550745165-9bc0b252726f',
  '1558494949-ef010cbdcc31', '1517245386807-bb43f82c33c4', '1580894894513-541e068a3e2b',
  '1555421689-d68471e189f2', '1553877522-43269d4ea984', '1542744173-8e7e191f6d01',
  // Portfolio / Creative (30)
  '1507003211169-0a1dd7228f2d', '1513364776144-60967b0f800f', '1452587925148-ce544e77e70d',
  '1542038784456-1ea8df7d1158', '1523726491678-bf852e717f6a', '1460661419907-fbcf45302e9f',
  '1501594907352-04cda38ebc29', '1499951360447-b19032a05ddc', '1448932223592-d1fc686e76ea',
  '1511512578047-dfb367046420', '1558655146-9f40138edfeb', '1518012312832-96aea3c91144',
  '1513542789411-b6a5d4f31634', '1472289065668-ce650ac443d2', '1503551723145-6c040742065b',
  '1524758631624-e2822e304c36', '1535016120720-40c646be5580', '1536924940846-227afb31e2a5',
  '1499244571948-7ccddb3583f1', '1459411552884-841db9b3cc2a', '1493238792000-8113da705763',
  '1509281373149-e957c6296406', '1470071459604-3b5ec3a7fe05', '1494790108377-be9c29b29330',
  '1504805572947-34fad45aed96', '1496307653780-42ee777d4833', '1516035069371-29a1b244cc32',
  '1519340241574-2cec6aef0c01', '1523800378286-fae245e13ed6', '1543946207-39bd91e70ca7',
  // Business / Corporate (30)
  '1497366216548-37526070297c', '1486406146926-c627a92ad1ab', '1454165804606-c3d57bc86b40',
  '1556761175-5973dc0f32e7', '1521737604893-d14cc237f11d', '1553028826-f4804a6dba3b',
  '1542744094-3a31f272c490', '1556761223-4c4282c73f77', '1557804506-669a67965ba0',
  '1560472354-b33ff0c44a43', '1556761175-4b46a572b786', '1521791136064-7986c2920216',
  '1556761175-b413da4baf72', '1517502884422-41eaead166d4', '1568992687947-868a62a9f521',
  '1552664730-d307ca884978', '1559136555-9303baea8ebd', '1573497019940-1c28c88b4f3e',
  '1573497491765-dccce02b29df', '1573496359142-b8d87734a5a2', '1573497620053-ea5300f94f21',
  '1560179707-f14e90ef3623', '1576267423445-b2e0074d68a4', '1553484771-371a605b060b',
  '1556742049-0cfed4f6a45d', '1556742111-a301076d9d18', '1556740758-28b93e4e853d',
  '1556742205-e10c9486e506', '1542626991-cbc4e32524cc', '1556740772-1a741367b773',
  // Restaurant / Food (30)
  '1414235077428-338989a2e8c0', '1517248135467-4c7edcad34c4', '1552566626-52f8b828add9',
  '1466978913421-dad2ebd01d17', '1504674900247-0877df9cc836', '1476224203421-9ac39bcb3327',
  '1504754524776-8f4f37790ca0', '1498837167922-ddd27525d352', '1540189549336-e6e99c3679fe',
  '1555939594-58d7cb561ad1', '1567620905732-2d1ec7ab7445', '1565299624946-b28f40a0ae38',
  '1565958011703-44f9829ba187', '1482049016688-2d3874f542ba', '1432139555190-58524dae6a55',
  '1495214783159-3503fd1f1b9c', '1473093295043-cdd812d0e601', '1481931098730-318b6f776db0',
  '1485963631004-f2f00b1d6150', '1490645935967-10de6ba17061', '1506354666786-de0aef4d805d',
  '1529042410759-befb1204b468', '1550547660-d9862f95f511', '1559339352-11d035aa65de',
  '1571091718767-18b5b1457add', '1551218808-94e220e084d2', '1559847844-5315695dadae',
  '1565299585323-38d6b0865b47', '1563379926898-05f4575a45d8', '1563245372-f21724e3856d',
  // Wellness / Spa (25)
  '1544161515-4ab6ce6db874', '1540555700478-4be289fbec6b', '1519824145371-296894a0daa9',
  '1507652313519-d4e9174996dd', '1600334089138-5e6b6d8bd1bb', '1545205597-3d9d02c29597',
  '1552693673-1bf958298935', '1571019613454-1cb2f99b2d8b', '1519823551278-64ac92734fb1',
  '1515377905703-c4788e51af15', '1540206063137-4a88ca974d1a', '1507003211169-0a1dd7228f2d',
  '1559599238-308793637427', '1574158622682-e40e69881006', '1560750588-73207b1ef5b8',
  '1545389336-cf090694435e', '1591343395082-e120d7b4f609', '1571019614242-c5c5dee9f50c',
  '1519823551278-64ac92734fb2', '1507652313519-d4e9174996de', '1540555700478-4be289fbec6c',
  '1544161515-4ab6ce6db875', '1545205597-3d9d02c29598', '1552693673-1bf958298936',
  '1571019613454-1cb2f99b2d8c',
  // Fitness / Gym (25)
  '1534438327276-14e5300c3a48', '1517963879433-6ad2b056d712', '1571019613454-1cb2f99b2d8d',
  '1574680096145-d05b474e2155', '1581009146145-b5ef050c2e1e', '1576678927484-cc907957088c',
  '1540497077202-7c8a3999166f', '1571902943202-507ec2618e8f', '1583454110551-21f2fa2afe61',
  '1526506118085-60ce8714f8c5', '1518611012118-696072aa579a', '1517836357463-d25dfeac3438',
  '1546483875-ad9014c88eba', '1549060279-7aa517d36a17', '1571731956672-f2b94d7dd0d9',
  '1518310383802-640c2de311b2', '1561214078-f3247647fc5e', '1571019613576-2b22c76fd8bf',
  '1574680178050-55c6a6a96e0a', '1581009137042-2e4a6dfc7096', '1576678927484-cc907957088d',
  '1540497077202-7c8a3999166e', '1571902943202-507ec2618e8e', '1583454110551-21f2fa2afe62',
  '1526506118085-60ce8714f8c6',
  // Travel (25)
  '1476514525535-07fb3b4ae5f1', '1488085061387-422e29b40080', '1507525428034-b723cf961d3e',
  '1469854523086-cc02fe5d8800', '1530789253388-582c481c54b0', '1504150558240-0b4fd8946624',
  '1506929562872-bb421503ef21', '1501785888108-af0d17975b6f', '1476900543235-9dd0c8169513',
  '1530521954074-e64f6810b386', '1502003148287-a82ef80a6abc', '1527631746610-bca00a040d60',
  '1501594907352-04cda38ebc30', '1520250497591-112f2f40a3f4', '1528127269322-539e1e28a42a',
  '1548574505023-3787a75c6ddc', '1505228395891-9a51e7e86bf6', '1516483638261-6c8e58fb210a',
  '1500835556837-99ac94a94552', '1536323760109-b763b02e60a5', '1530789253388-582c481c54b1',
  '1504150558240-0b4fd8946625', '1506929562872-bb421503ef22', '1501785888108-af0d17975b70',
  '1476900543235-9dd0c8169514',
  // Health / Clinic (25)
  '1576091160399-112ba8d25d1d', '1579684385127-1ef15d508118', '1530497610245-94d3c16cda28',
  '1559757175-5700dde675bc', '1576091160550-2173dba999ef', '1551076805-e1869033e561',
  '1582750433449-648ed127bb54', '1631217868264-e5b90bb7e133', '1559757148-34a15ab1da8a',
  '1530026405186-ed1f139313f8', '1576091160399-112ba8d25d1e', '1579684385127-1ef15d508119',
  '1530497610245-94d3c16cda29', '1559757175-5700dde675bd', '1576091160550-2173dba999f0',
  '1551076805-e1869033e562', '1582750433449-648ed127bb55', '1631217868264-e5b90bb7e134',
  '1559757148-34a15ab1da8b', '1530026405186-ed1f139313f9', '1576091160399-112ba8d25d1f',
  '1579684385127-1ef15d50811a', '1530497610245-94d3c16cda2a', '1559757175-5700dde675be',
  '1576091160550-2173dba999f1',
  // Education (25)
  '1523240795612-9a054b0db644', '1524178232363-1fb2b075b655', '1503676260728-1c00da094a0b',
  '1427504494785-3a9ca7044f45', '1509062522246-3755977927d7', '1522202176988-66273c2fd55f',
  '1497633762265-9d179a990aa6', '1456513080510-7bf3a84b82f8', '1488190211105-8b0e65b80b4e',
  '1501504905252-473c47e087f8', '1523240795612-9a054b0db645', '1524178232363-1fb2b075b656',
  '1503676260728-1c00da094a0c', '1427504494785-3a9ca7044f46', '1509062522246-3755977927d8',
  '1522202176988-66273c2fd560', '1497633762265-9d179a990aa7', '1456513080510-7bf3a84b82f9',
  '1488190211105-8b0e65b80b4f', '1501504905252-473c47e087f9', '1523240795612-9a054b0db646',
  '1524178232363-1fb2b075b657', '1503676260728-1c00da094a0d', '1427504494785-3a9ca7044f47',
  '1509062522246-3755977927d9',
  // Real Estate (25)
  '1560518883-ce09059eeffa', '1560448204-e02f11c3d0e2', '1564013799919-ab11e7d2a6ca',
  '1582407947304-fd86f028f716', '1560185007-cde436f6a4d0', '1560184897-ae75f418493e',
  '1565182999561-18d7dc61c393', '1570129477492-45c003edd2be', '1512917774080-9991f1c4c750',
  '1582268611958-ebfd161ef9cf', '1560518883-ce09059eeffb', '1560448204-e02f11c3d0e3',
  '1564013799919-ab11e7d2a6cb', '1582407947304-fd86f028f717', '1560185007-cde436f6a4d1',
  '1560184897-ae75f418493f', '1565182999561-18d7dc61c394', '1570129477492-45c003edd2bf',
  '1512917774080-9991f1c4c751', '1582268611958-ebfd161ef9d0', '1560518883-ce09059eeffc',
  '1560448204-e02f11c3d0e4', '1564013799919-ab11e7d2a6cc', '1582407947304-fd86f028f718',
  '1560185007-cde436f6a4d2',
  // Events (25)
  '1492684223066-81342ee5ff30', '1540575467063-178a50152fba', '1501281668745-f7f57925c3b4',
  '1478147427282-58a87a120781', '1533174072545-7a4b6ad7a6c3', '1505236858219-8359eb29e329',
  '1464366400600-7168b8af9bc3', '1472653816382-0e78d7d9e4b5', '1492684223066-81342ee5ff31',
  '1540575467063-178a50152fbb', '1501281668745-f7f57925c3b5', '1478147427282-58a87a120782',
  '1533174072545-7a4b6ad7a6c4', '1505236858219-8359eb29e32a', '1464366400600-7168b8af9bc4',
  '1472653816382-0e78d7d9e4b6', '1492684223066-81342ee5ff32', '1540575467063-178a50152fbc',
  '1501281668745-f7f57925c3b6', '1478147427282-58a87a120783', '1533174072545-7a4b6ad7a6c5',
  '1505236858219-8359eb29e32b', '1464366400600-7168b8af9bc5', '1472653816382-0e78d7d9e4b7',
  '1492684223066-81342ee5ff33',
  // Fashion (25)
  '1558618666-fcd25c85f82e', '1515886657613-9f3515b0c78f', '1445205170230-053b83016050',
  '1469334031218-e382a71b716b', '1490481651871-ab68de25d43d', '1441984904996-e0b6ba687e04',
  '1509631179647-0177331693ae', '1496747611176-843222e1e57c', '1558618666-fcd25c85f82f',
  '1515886657613-9f3515b0c790', '1445205170230-053b83016051', '1469334031218-e382a71b716c',
  '1490481651871-ab68de25d43e', '1441984904996-e0b6ba687e05', '1509631179647-0177331693af',
  '1496747611176-843222e1e57d', '1558618666-fcd25c85f830', '1515886657613-9f3515b0c791',
  '1445205170230-053b83016052', '1469334031218-e382a71b716d', '1490481651871-ab68de25d43f',
  '1441984904996-e0b6ba687e06', '1509631179647-0177331693b0', '1496747611176-843222e1e57e',
  '1558618666-fcd25c85f831',
  // Hotel (25)
  '1566073771259-6a8506099945', '1542314831-de9326eab519', '1551882547-ff40c63fe5fa',
  '1564501049412-61c2a3083791', '1582719508461-905c673771eb', '1571896349842-a8e0e8d7d0f4',
  '1520250497591-112f2f40a3f5', '1584132967334-10e028bd69f7', '1566073771259-6a8506099946',
  '1542314831-de9326eab51a', '1551882547-ff40c63fe5fb', '1564501049412-61c2a3083792',
  '1582719508461-905c673771ec', '1571896349842-a8e0e8d7d0f5', '1520250497591-112f2f40a3f6',
  '1584132967334-10e028bd69f8', '1566073771259-6a8506099947', '1542314831-de9326eab51b',
  '1551882547-ff40c63fe5fc', '1564501049412-61c2a3083793', '1582719508461-905c673771ed',
  '1571896349842-a8e0e8d7d0f6', '1520250497591-112f2f40a3f7', '1584132967334-10e028bd69f9',
  '1566073771259-6a8506099948',
  // Nonprofit (25)
  '1469571486292-0ba58a3f068b', '1488521787991-ed7bbaae773c', '1559027615-cd4628902d4a',
  '1532629345422-7515f3d16bb6', '1517486808906-6ca8b3f04846', '1469571486292-0ba58a3f068c',
  '1488521787991-ed7bbaae773d', '1559027615-cd4628902d4b', '1532629345422-7515f3d16bb7',
  '1517486808906-6ca8b3f04847', '1469571486292-0ba58a3f068d', '1488521787991-ed7bbaae773e',
  '1559027615-cd4628902d4c', '1532629345422-7515f3d16bb8', '1517486808906-6ca8b3f04848',
  '1469571486292-0ba58a3f068e', '1488521787991-ed7bbaae773f', '1559027615-cd4628902d4d',
  '1532629345422-7515f3d16bb9', '1517486808906-6ca8b3f04849', '1469571486292-0ba58a3f068f',
  '1488521787991-ed7bbaae7740', '1559027615-cd4628902d4e', '1532629345422-7515f3d16bba',
  '1517486808906-6ca8b3f0484a',
  // Agency (25)
  '1553877522-43269d4ea984', '1559136555-9303baea8ebd', '1542744173-8e7e191f6d01',
  '1460661419907-fbcf45302e9f', '1551434678-e076c223a692', '1553877522-43269d4ea985',
  '1559136555-9303baea8ebe', '1542744173-8e7e191f6d02', '1460661419907-fbcf45302ea0',
  '1551434678-e076c223a693', '1553877522-43269d4ea986', '1559136555-9303baea8ebf',
  '1542744173-8e7e191f6d03', '1460661419907-fbcf45302ea1', '1551434678-e076c223a694',
  '1553877522-43269d4ea987', '1559136555-9303baea8ec0', '1542744173-8e7e191f6d04',
  '1460661419907-fbcf45302ea2', '1551434678-e076c223a695', '1553877522-43269d4ea988',
  '1559136555-9303baea8ec1', '1542744173-8e7e191f6d05', '1460661419907-fbcf45302ea3',
  '1551434678-e076c223a696',
  // Tech Landing (25)
  '1518770660439-4636190af475', '1526374965328-7f61d4dc18c5', '1550751827-4bd374c3f58b',
  '1488590528505-98d2b5aba04b', '1461749280684-dccba630e2f6', '1518770660439-4636190af476',
  '1526374965328-7f61d4dc18c6', '1550751827-4bd374c3f58c', '1488590528505-98d2b5aba04c',
  '1461749280684-dccba630e2f7', '1518770660439-4636190af477', '1526374965328-7f61d4dc18c7',
  '1550751827-4bd374c3f58d', '1488590528505-98d2b5aba04d', '1461749280684-dccba630e2f8',
  '1518770660439-4636190af478', '1526374965328-7f61d4dc18c8', '1550751827-4bd374c3f58e',
  '1488590528505-98d2b5aba04e', '1461749280684-dccba630e2f9', '1518770660439-4636190af479',
  '1526374965328-7f61d4dc18c9', '1550751827-4bd374c3f58f', '1488590528505-98d2b5aba04f',
  '1461749280684-dccba630e2fa',
  // Food & Beverage (25)
  '1504674900247-0877df9cc836', '1476224203421-9ac39bcb3327', '1504754524776-8f4f37790ca0',
  '1498837167922-ddd27525d352', '1540189549336-e6e99c3679fe', '1504674900247-0877df9cc837',
  '1476224203421-9ac39bcb3328', '1504754524776-8f4f37790ca1', '1498837167922-ddd27525d353',
  '1540189549336-e6e99c3679ff', '1504674900247-0877df9cc838', '1476224203421-9ac39bcb3329',
  '1504754524776-8f4f37790ca2', '1498837167922-ddd27525d354', '1540189549336-e6e99c367a00',
  '1504674900247-0877df9cc839', '1476224203421-9ac39bcb332a', '1504754524776-8f4f37790ca3',
  '1498837167922-ddd27525d355', '1540189549336-e6e99c367a01', '1504674900247-0877df9cc83a',
  '1476224203421-9ac39bcb332b', '1504754524776-8f4f37790ca4', '1498837167922-ddd27525d356',
  '1540189549336-e6e99c367a02',
];

// Category → starting offset in PHOTO_POOL
const CATEGORY_OFFSETS: Record<string, number> = {
  saas: 0, portfolio: 30, business: 60, restaurant: 90,
  wellness: 120, fitness: 145, travel: 170, health: 195,
  education: 220, realestate: 245, event: 270, fashion: 295,
  hotel: 320, nonprofit: 345, agency: 370, techlanding: 395, foodbev: 420,
};

function getTemplateImageUrl(template: Template, globalIndex: number): string {
  // Use picsum.photos with a seed derived from template name for guaranteed unique working images
  const seed = template.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  return `https://picsum.photos/seed/${seed}-${globalIndex}/800/600`;
}

function TemplateMiniPreview({ template, index }: { template: Template; index: number }) {
  const imgUrl = getTemplateImageUrl(template, index);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-lg">
      <img src={imgUrl} alt={template.name} className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    </div>
  );
}

export default function NewSite() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [title, setTitle] = useState('');

  const filteredTemplates = useMemo(() => {
    let list = getTemplatesByCategory(activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  const handleSelectTemplate = (t: Template) => {
    if (t.id === 'blank') {
      const site = createSite({ title: 'Untitled Site', category: 'saas', components_json: '[]', global_styles_json: '{}' });
      navigate(`/editor?id=${site.id}`);
      return;
    }
    setSelectedTemplate(t);
    setStep(2);
  };

  const handleDoubleClickCreate = (t: Template) => {
    if (t.id === 'blank') { handleSelectTemplate(t); return; }
    const { components, category, pages } = getTemplate(t.id);
    const site = createSite({
      title: t.name + ' Site',
      category,
      components_json: serializeComponents(components),
      pages_json: serializePages(pages),
      global_styles_json: '{}',
    });
    navigate(`/editor?id=${site.id}`);
  };

  const handleCreate = () => {
    if (!selectedTemplate) return;
    const { components, category, pages } = getTemplate(selectedTemplate.id);
    const themed = selectedTheme ? applyThemeToComponents(components, selectedTheme) : components;
    const themedPages = selectedTheme ? pages.map(p => ({ ...p, components: applyThemeToComponents(p.components, selectedTheme) })) : pages;
    const site = createSite({
      title: title || selectedTemplate.name + ' Site',
      category,
      components_json: serializeComponents(themed),
      pages_json: serializePages(themedPages),
      global_styles_json: selectedTheme ? JSON.stringify(selectedTheme) : '{}',
    });
    navigate(`/editor?id=${site.id}`);
  };

  const totalCount = getTemplatesByCategory('all').length;

  return (
    <div className="min-h-screen bg-landing-bg">
      <Navbar />

      <div className="border-b border-landing-border bg-landing-surface/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => step > 1 ? setStep((step - 1) as 1 | 2) : navigate('/')} className="rounded-lg p-1.5 text-landing-text transition-colors hover:bg-landing-border hover:text-landing-bright">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-landing-bright">Create New Site</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {['Template', 'Customize'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && <span className="text-landing-text/40">→</span>}
                <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${step > i ? 'bg-primary/15 text-primary font-medium' : 'text-landing-text'}`}>
                  {step > i + 1 && <Check className="h-3 w-3" />}
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-7xl px-6 py-8">
            <div className="mb-6">
              <h1 className="mb-1 text-2xl font-bold text-landing-bright">Choose a Template</h1>
              <p className="text-sm text-landing-text">{totalCount} professionally designed templates across {categories.length - 1} categories.</p>
            </div>

            {/* Category tabs + search */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {categories.map(cat => {
                const Icon = cat.icon;
                const count = cat.id === 'all' ? totalCount : getTemplatesByCategory(cat.id).length;
                return (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${activeCategory === cat.id ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-landing-surface text-landing-text hover:bg-landing-border hover:text-landing-bright border border-landing-border'}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {cat.label}
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeCategory === cat.id ? 'bg-primary-foreground/20' : 'bg-landing-border'}`}>{count}</span>
                  </button>
                );
              })}
              <div className="ml-auto flex items-center gap-2 rounded-lg border border-landing-border bg-landing-surface px-3 py-1.5">
                <Search className="h-4 w-4 text-landing-text/50" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..."
                  className="w-48 bg-transparent text-sm text-landing-bright placeholder:text-landing-text/40 focus:outline-none" />
              </div>
            </div>

            {/* Blank canvas option */}
            <motion.button onClick={() => handleSelectTemplate(templates[0])} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex w-full items-center gap-4 rounded-xl border-2 border-dashed border-landing-border bg-landing-surface/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-landing-surface">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-landing-border">
                <FileText className="h-6 w-6 text-landing-text" />
              </div>
              <div>
                <h3 className="font-semibold text-landing-bright">Blank Canvas</h3>
                <p className="text-xs text-landing-text">Start from scratch — drag and drop components to build your own layout</p>
              </div>
            </motion.button>

            {/* Template grid */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredTemplates.map((t, i) => (
                <motion.button key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.4) }}
                  onClick={() => handleSelectTemplate(t)}
                  onDoubleClick={() => handleDoubleClickCreate(t)}
                  className="group overflow-hidden rounded-xl border border-landing-border bg-landing-surface text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className="aspect-[4/3] overflow-hidden">
                    <TemplateMiniPreview template={t} index={i} />
                  </div>
                  <div className="border-t border-landing-border p-3">
                    <h3 className="mb-0.5 text-sm font-semibold text-landing-bright group-hover:text-primary transition-colors">{t.name}</h3>
                    <p className="text-xs text-landing-text line-clamp-1">{t.description}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{t.category}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="py-20 text-center text-landing-text">No templates match your search.</div>
            )}
          </motion.div>
        )}

        {step === 2 && selectedTemplate && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-6xl px-6 py-8">
            <div className="mb-6">
              <h1 className="mb-1 text-2xl font-bold text-landing-bright">Customize: {selectedTemplate.name}</h1>
              <p className="text-sm text-landing-text">Choose a theme and name your site. Everything can be edited later.</p>
            </div>

            <div className="mb-6">
              <input type="text" placeholder="Site title (optional)" value={title} onChange={e => setTitle(e.target.value)}
                className="w-full max-w-sm rounded-lg border border-landing-border bg-landing-surface px-4 py-2.5 text-landing-bright placeholder:text-landing-text/50 focus:border-primary focus:outline-none" />
            </div>

            <button onClick={() => setSelectedTheme(null)}
              className={`mb-4 flex items-center gap-3 rounded-lg border px-4 py-3 transition-all ${!selectedTheme ? 'border-primary bg-primary/10' : 'border-landing-border bg-landing-surface hover:border-landing-text/30'}`}>
              {!selectedTheme && <Check className="h-4 w-4 text-primary" />}
              <span className="text-sm font-medium text-landing-bright">Default theme (template colors)</span>
            </button>

            <ThemePicker category={selectedTemplate.category} selected={selectedTheme} onSelect={setSelectedTheme} columns={5} />

            {selectedTheme && (
              <div className="mt-6 flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
                <div className="flex gap-1.5">
                  {[selectedTheme.primary, selectedTheme.bg, selectedTheme.surface, selectedTheme.text, selectedTheme.secondary].map((c, i) => (
                    <div key={i} className="h-5 w-5 rounded-full border border-landing-border" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-sm font-medium text-landing-bright">{selectedTheme.name}</span>
              </div>
            )}

            <div className="mt-8">
              <button onClick={handleCreate} className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 shadow-lg shadow-primary/20">
                Create Website →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}