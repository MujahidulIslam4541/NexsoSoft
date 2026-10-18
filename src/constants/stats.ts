export interface StatItem {
  value: number | string;
  suffix?: string;
  label: string;
  isText?: boolean;
  delay?: number;
}

export const STATS_HEADER = {
  badge: 'By the numbers',
  title: 'Building Modern Software for Your Success',
  subtitle:
    'We help companies grow by creating reliable, easy-to-use digital products that solve real business problems.',
};

export const STATS_ITEMS: StatItem[] = [
  { value: 50, suffix: '+', label: 'Projects completed and delivered.', isText: false, delay: 0 },
  { value: 15, suffix: '+', label: 'Happy clients from around the world.', isText: false, delay: 120 },
  { value: 'Top Rated', label: 'Trusted by our partners daily.', isText: true, delay: 240 },
];

export interface MapNode {
  id: string;
  name: string;
  x: number;
  y: number;
  latency: string;
  flow: string;
  nodes: string;
}

export const MAP_NODES: MapNode[] = [
  { id: 'sv', name: 'Silicon Valley', x: 100, y: 100, latency: '5ms', flow: '2.4 TB/s', nodes: '3.8M Active' },
  { id: 'ny', name: 'New York', x: 165, y: 90, latency: '8ms', flow: '1.9 TB/s', nodes: '2.1M Active' },
  { id: 'sp', name: 'Sao Paulo', x: 210, y: 220, latency: '22ms', flow: '0.8 TB/s', nodes: '1.2M Active' },
  { id: 'ld', name: 'London', x: 325, y: 65, latency: '11ms', flow: '1.7 TB/s', nodes: '2.5M Active' },
  { id: 'fr', name: 'Frankfurt', x: 350, y: 70, latency: '12ms', flow: '1.6 TB/s', nodes: '2.2M Active' },
  { id: 'sg', name: 'Singapore', x: 525, y: 195, latency: '15ms', flow: '1.1 TB/s', nodes: '1.8M Active' },
  { id: 'tk', name: 'Tokyo', x: 590, y: 95, latency: '19ms', flow: '1.5 TB/s', nodes: '2.4M Active' },
  { id: 'sd', name: 'Sydney', x: 615, y: 245, latency: '26ms', flow: '0.6 TB/s', nodes: '0.9M Active' },
];

export const NETWORK_CONNECTIONS = [
  { from: 'sv', to: 'ny' },
  { from: 'ny', to: 'ld' },
  { from: 'ld', to: 'fr' },
  { from: 'fr', to: 'tk' },
  { from: 'tk', to: 'sd' },
  { from: 'sd', to: 'sg' },
  { from: 'sg', to: 'sp' },
  { from: 'sp', to: 'sv' },
  { from: 'ny', to: 'sp' },
  { from: 'ld', to: 'sp' },
  { from: 'fr', to: 'sg' },
  { from: 'tk', to: 'sg' },
];

