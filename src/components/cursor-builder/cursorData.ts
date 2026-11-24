import { CursorConfig } from './types';

export const CURSOR_CONFIGS: CursorConfig[] = [
  {
    id: 'layout',
    name: 'Layout.exe',
    color: '#38bdf8', // Sky
    role: 'Creates overall page layout & grid systems',
    initialPos: { x: 12, y: 15 },
  },
  {
    id: 'nav',
    name: 'NavBot',
    color: '#a855f7', // Purple
    role: 'Builds navigation bar, logo, and links',
    initialPos: { x: 45, y: 8 },
  },
  {
    id: 'hero',
    name: 'HeroAI',
    color: '#ec4899', // Pink
    role: 'Creates hero section, title, and structure',
    initialPos: { x: 25, y: 28 },
  },
  {
    id: 'text',
    name: 'TextWriter',
    color: '#f59e0b', // Amber
    role: 'Types headings, taglines, and descriptions',
    initialPos: { x: 30, y: 35 },
  },
  {
    id: 'color',
    name: 'ColorMaster',
    color: '#10b981', // Emerald
    role: 'Applies colors, themes, gradients, and glows',
    initialPos: { x: 70, y: 22 },
  },
  {
    id: 'pixel',
    name: 'PixelBot',
    color: '#06b6d4', // Cyan
    role: 'Adds images, icons, avatar, and visuals',
    initialPos: { x: 80, y: 32 },
  },
  {
    id: 'card',
    name: 'CardBuilder',
    color: '#6366f1', // Indigo
    role: 'Creates project cards & bento boxes',
    initialPos: { x: 40, y: 68 },
  },
  {
    id: 'motion',
    name: 'Motion.dev',
    color: '#f43f5e', // Rose
    role: 'Adds animations, hover physics & springs',
    initialPos: { x: 55, y: 42 },
  },
  {
    id: 'style',
    name: 'StyleBot',
    color: '#8b5cf6', // Violet
    role: 'Applies borders, shadows, and glass blur',
    initialPos: { x: 20, y: 55 },
  },
  {
    id: 'footer',
    name: 'FooterAI',
    color: '#14b8a6', // Teal
    role: 'Creates footer and social links',
    initialPos: { x: 50, y: 92 },
  },
  {
    id: 'responsive',
    name: 'ResponsiveX',
    color: '#eab308', // Yellow
    role: 'Adjusts responsive flex and breakpoints',
    initialPos: { x: 88, y: 50 },
  },
  {
    id: 'final',
    name: 'FinalTouch',
    color: '#f97316', // Orange
    role: 'Performs final visual polishing & sparkles',
    initialPos: { x: 65, y: 80 },
  },
  {
    id: 'code',
    name: 'CodeCraft',
    color: '#84cc16', // Lime
    role: 'Assembles skill matrix and tech tags',
    initialPos: { x: 35, y: 60 },
  },
  {
    id: 'contact',
    name: 'ContactSync',
    color: '#d946ef', // Fuchsia
    role: 'Constructs contact form & email link',
    initialPos: { x: 75, y: 85 },
  },
  {
    id: 'robot',
    name: 'RobotSmith',
    color: '#0284c7', // Ocean blue
    role: 'Spawns and boots interactive mascot robot',
    initialPos: { x: 92, y: 78 },
  },
  {
    id: 'audit',
    name: 'QualityAudit',
    color: '#22c55e', // Green
    role: 'Audits WCAG contrast and zero errors',
    initialPos: { x: 8, y: 40 },
  },
];

// Waypoint definition for a cursor at different progress thresholds (0..100)
export interface CursorWaypoint {
  progress: number; // 0..100
  x: number; // percentage of viewport 0..100
  y: number; // percentage of viewport 0..100
  action: string;
  isClicking?: boolean;
}

// Coordinated timeline choreography for each cursor
export const CURSOR_TIMELINES: Record<string, CursorWaypoint[]> = {
  layout: [
    { progress: 0, x: 10, y: 12, action: 'Initializing grid guides', isClicking: true },
    { progress: 12, x: 50, y: 8, action: 'Drawing 1440px container' },
    { progress: 28, x: 25, y: 25, action: 'Mounting Hero container', isClicking: true },
    { progress: 45, x: 35, y: 50, action: 'Expanding About container' },
    { progress: 65, x: 50, y: 68, action: 'Calculating Projects grid', isClicking: true },
    { progress: 85, x: 30, y: 84, action: 'Drawing Education timeline' },
    { progress: 95, x: 50, y: 92, action: 'Finalizing layout hierarchy' },
    { progress: 100, x: 50, y: 50, action: 'Layout locked ✨' },
  ],
  nav: [
    { progress: 0, x: 45, y: 6, action: 'Waiting for layout' },
    { progress: 10, x: 50, y: 5, action: 'Synthesizing navbar frame', isClicking: true },
    { progress: 18, x: 16, y: 5, action: 'Positioning ABHAY wordmark' },
    { progress: 24, x: 60, y: 5, action: 'Linking navigation anchors', isClicking: true },
    { progress: 32, x: 88, y: 5, action: 'Mounting Resume CTA button' },
    { progress: 60, x: 50, y: 5, action: 'Verifying scroll backdrop filter' },
    { progress: 88, x: 75, y: 5, action: 'Testing mobile menu toggle' },
    { progress: 100, x: 50, y: 50, action: 'Nav complete ✨' },
  ],
  hero: [
    { progress: 0, x: 20, y: 20, action: 'Awaiting container' },
    { progress: 15, x: 28, y: 20, action: 'Preparing hero canvas' },
    { progress: 25, x: 25, y: 24, action: 'Mounting status badge: ACTUALIZING' },
    { progress: 35, x: 30, y: 32, action: 'Framing headline bounding box', isClicking: true },
    { progress: 48, x: 35, y: 44, action: 'Injecting action CTA buttons' },
    { progress: 70, x: 22, y: 38, action: 'Fine-tuning hero responsive margin' },
    { progress: 90, x: 28, y: 30, action: 'Calibrating hero depth' },
    { progress: 100, x: 50, y: 50, action: 'Hero locked ✨' },
  ],
  text: [
    { progress: 0, x: 25, y: 10, action: 'Loading display typography' },
    { progress: 15, x: 18, y: 5, action: 'Typing logo: "ABHAY ANAND"', isClicking: true },
    { progress: 28, x: 24, y: 22, action: 'Typing kicker: ACTUALIZING...' },
    { progress: 34, x: 28, y: 30, action: 'Streaming headline: "ABHAY"', isClicking: true },
    { progress: 40, x: 32, y: 35, action: 'Streaming headline: "ANAND"', isClicking: true },
    { progress: 46, x: 28, y: 40, action: 'Typing: "Software Engineer..."' },
    { progress: 58, x: 35, y: 54, action: 'Writing About bio paragraph' },
    { progress: 78, x: 45, y: 72, action: 'Adding project descriptions' },
    { progress: 92, x: 40, y: 88, action: 'Writing contact subtitle' },
    { progress: 100, x: 50, y: 50, action: 'Copy verified ✨' },
  ],
  color: [
    { progress: 0, x: 68, y: 15, action: 'Initializing color variables' },
    { progress: 14, x: 40, y: 6, action: 'Injecting glass background blur' },
    { progress: 25, x: 72, y: 22, action: 'Painting radial indigo glow', isClicking: true },
    { progress: 36, x: 30, y: 33, action: 'Applying brand purple gradient' },
    { progress: 52, x: 26, y: 44, action: 'Styling gradient CTA buttons', isClicking: true },
    { progress: 72, x: 52, y: 68, action: 'Applying card hover gradient' },
    { progress: 88, x: 80, y: 82, action: 'Syncing 6 theme modes' },
    { progress: 100, x: 50, y: 50, action: 'Palette vibrant ✨' },
  ],
  pixel: [
    { progress: 0, x: 78, y: 25, action: 'Prefetching icons & assets' },
    { progress: 20, x: 14, y: 5, action: 'Rendering Sparkles icon' },
    { progress: 32, x: 78, y: 28, action: 'Rendering tech spectrum icons' },
    { progress: 44, x: 22, y: 46, action: 'Mounting GitHub & LinkedIn icons', isClicking: true },
    { progress: 62, x: 70, y: 58, action: 'Embedding tech skill logos' },
    { progress: 76, x: 32, y: 72, action: 'Generating Habit-Flow UI preview', isClicking: true },
    { progress: 86, x: 65, y: 72, action: 'Generating Robotics preview' },
    { progress: 100, x: 50, y: 50, action: 'Pixels pristine ✨' },
  ],
  card: [
    { progress: 0, x: 40, y: 35, action: 'Calculating card aspect ratios' },
    { progress: 30, x: 75, y: 32, action: 'Building "Engineering Mindset" bento' },
    { progress: 42, x: 75, y: 44, action: 'Building "Robotics" bento card', isClicking: true },
    { progress: 68, x: 28, y: 72, action: 'Creating Habit-Flow card frame' },
    { progress: 76, x: 50, y: 72, action: 'Creating Robotics Controller card', isClicking: true },
    { progress: 84, x: 74, y: 72, action: 'Creating Portfolio OS card' },
    { progress: 92, x: 35, y: 84, action: 'Mounting LPU Education card' },
    { progress: 100, x: 50, y: 50, action: 'Cards assembled ✨' },
  ],
  motion: [
    { progress: 0, x: 55, y: 35, action: 'Loading spring physics engine' },
    { progress: 22, x: 50, y: 6, action: 'Attaching navbar scroll transition' },
    { progress: 38, x: 30, y: 34, action: 'Adding headline hover lift' },
    { progress: 50, x: 26, y: 44, action: 'Connecting button spring physics', isClicking: true },
    { progress: 68, x: 75, y: 60, action: 'Staggering skill badges reveal' },
    { progress: 82, x: 50, y: 74, action: 'Attaching card tilt effects', isClicking: true },
    { progress: 94, x: 50, y: 2, action: 'Binding top scroll progress bar' },
    { progress: 100, x: 50, y: 50, action: '60fps motion ready ✨' },
  ],
  style: [
    { progress: 0, x: 18, y: 48, action: 'Reading Tailwind theme configuration' },
    { progress: 16, x: 48, y: 6, action: 'Applying hairline border to navbar' },
    { progress: 30, x: 35, y: 28, action: 'Drawing glass border around hero', isClicking: true },
    { progress: 48, x: 72, y: 36, action: 'Polishing bento card radii: 1.25rem' },
    { progress: 66, x: 32, y: 56, action: 'Setting whitespace padding (py-12)' },
    { progress: 80, x: 50, y: 72, action: 'Applying subtle drop-shadows' },
    { progress: 92, x: 72, y: 85, action: 'Polishing contact input borders' },
    { progress: 100, x: 50, y: 50, action: 'Styles applied ✨' },
  ],
  footer: [
    { progress: 0, x: 48, y: 88, action: 'Awaiting footer anchor' },
    { progress: 25, x: 50, y: 92, action: 'Drafting footer wireframe' },
    { progress: 55, x: 45, y: 94, action: 'Placing copyright notice' },
    { progress: 75, x: 55, y: 94, action: 'Wiring footer social links', isClicking: true },
    { progress: 88, x: 88, y: 94, action: 'Mounting back-to-top button' },
    { progress: 96, x: 50, y: 94, action: 'Locking footer container' },
    { progress: 100, x: 50, y: 50, action: 'Footer complete ✨' },
  ],
  responsive: [
    { progress: 0, x: 88, y: 45, action: 'Checking viewport media queries' },
    { progress: 25, x: 92, y: 25, action: 'Validating desktop 1440px width' },
    { progress: 48, x: 85, y: 48, action: 'Adjusting hero split column grid', isClicking: true },
    { progress: 68, x: 90, y: 68, action: 'Setting 3-column project grid' },
    { progress: 84, x: 88, y: 82, action: 'Testing mobile touch targets (44px)' },
    { progress: 95, x: 85, y: 50, action: 'Zero overflow confirmed' },
    { progress: 100, x: 50, y: 50, action: 'Responsive approved ✨' },
  ],
  final: [
    { progress: 0, x: 60, y: 75, action: 'Preparing polishing passes' },
    { progress: 35, x: 30, y: 30, action: 'Buffing headline contrast' },
    { progress: 55, x: 70, y: 50, action: 'Inspecting icon alignment' },
    { progress: 75, x: 45, y: 70, action: 'Aligning project card tags' },
    { progress: 88, x: 50, y: 50, action: 'Spraying celebratory particles', isClicking: true },
    { progress: 96, x: 50, y: 50, action: 'Final visual inspection' },
    { progress: 100, x: 50, y: 50, action: 'Pixel perfect ✨' },
  ],
  code: [
    { progress: 0, x: 35, y: 55, action: 'Structuring skills taxonomy' },
    { progress: 28, x: 25, y: 45, action: 'Connecting GitHub API data' },
    { progress: 52, x: 62, y: 54, action: 'Mounting Languages: C++, JS, Python' },
    { progress: 64, x: 72, y: 56, action: 'Mounting Frameworks: React, Node', isClicking: true },
    { progress: 74, x: 80, y: 58, action: 'Mounting Databases: MySQL, MongoDB' },
    { progress: 86, x: 65, y: 60, action: 'Mounting Robotics & Sensors' },
    { progress: 100, x: 50, y: 50, action: 'Skills locked ✨' },
  ],
  contact: [
    { progress: 0, x: 75, y: 80, action: 'Preparing contact endpoint' },
    { progress: 30, x: 70, y: 85, action: 'Framing contact card' },
    { progress: 60, x: 65, y: 86, action: 'Creating email link (mailto)' },
    { progress: 78, x: 72, y: 88, action: 'Adding LinkedIn direct connect', isClicking: true },
    { progress: 90, x: 75, y: 86, action: 'Validating form accessibility' },
    { progress: 100, x: 50, y: 50, action: 'Contact connected ✨' },
  ],
  robot: [
    { progress: 0, x: 90, y: 75, action: 'Initializing Robot Mascot BIOS' },
    { progress: 30, x: 92, y: 76, action: 'Synthesizing chassis & visor' },
    { progress: 55, x: 91, y: 78, action: 'Booting speech bubble processor' },
    { progress: 75, x: 92, y: 80, action: 'Calibrating interactive physics', isClicking: true },
    { progress: 90, x: 91, y: 80, action: 'Robot says: "Let\'s build!" 🤖' },
    { progress: 100, x: 50, y: 50, action: 'Robot online ✨' },
  ],
  audit: [
    { progress: 0, x: 8, y: 35, action: 'Booting accessibility scanner' },
    { progress: 20, x: 12, y: 15, action: 'Auditing top bar contrast (WCAG AA)' },
    { progress: 45, x: 10, y: 35, action: 'Checking text readability ratios' },
    { progress: 68, x: 14, y: 65, action: 'Verifying image alt tags' },
    { progress: 88, x: 10, y: 80, action: 'Testing keyboard navigation tab stops', isClicking: true },
    { progress: 96, x: 12, y: 50, action: 'Zero lint errors, all tests pass' },
    { progress: 100, x: 50, y: 50, action: 'Certified 100/100 ✨' },
  ],
};
