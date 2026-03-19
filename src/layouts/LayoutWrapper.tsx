'use client';

import { siteConfig } from '@/lib/config';
import { getLayoutEntry } from './layout-registry';

interface LayoutWrapperProps {
  sections: Record<string, React.ReactNode>;
}

export default function LayoutWrapper({ sections }: LayoutWrapperProps) {
  const layout = getLayoutEntry(siteConfig.layout.id);
  const order = siteConfig.layout.sectionsOrder.length > 0
    ? siteConfig.layout.sectionsOrder
    : layout.sectionsOrder;

  return (
    <div
      data-layout={siteConfig.layout.id}
      data-nav-style={layout.navigationStyle}
      data-footer-style={layout.footerStyle}
    >
      {order.map((sectionId) => {
        const section = sections[sectionId];
        if (!section) return null;
        return (
          <section key={sectionId} id={sectionId} data-section={sectionId}>
            {section}
          </section>
        );
      })}
    </div>
  );
}
