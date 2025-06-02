import type { NextPage } from 'next';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import HotspotImageNew from '../components/HotspotImageNew';

// Define local interfaces for mock data if not importing from HotspotImageNew.tsx
// These should ideally match or be subsets of the interfaces in HotspotImageNew.tsx
interface LocalHotspotInfo {
  index: number; // Required by HotspotTooltipNew
  hotspotName: string;
  hotspotSubTitle: string;
  topPos: number;
  leftPos: number;
  multilineName?: boolean;
  // Fields for sidebar/accordion
  infoHeader?: string;
  infoParagraph?: string;
  infoParagraph2?: string;
  bulletPoints?: string[];
  ctaBodyText?: string;
  ctaButtonText?: string; // Changed from ctaLinkText for clarity if it's a button
  ctaButtonLink?: string; // Changed from ctaUrl for clarity
  altCtaBodyText?: string;
  altCtaButtonText?: string;
  altCtaButtonLink?: string;
}

interface LocalSectionHeading {
  titleLine1?: string;
  titleLine2?: string;
  subTitle?: string;
  body?: string;
  // For intro CTA button
  ctaPButton?: string; 
  ctaPLink?: string;
  ctaPtarget?: string;
  // Other text if needed
  ctaPText?: string;
}

const Demo: NextPage = () => {
  const mockSectionHeading: LocalSectionHeading = {
    titleLine1: "Explore Our Interactive Product",
    titleLine2: "Discover Key Features",
    subTitle: "Getting Started Guide",
    body: "Click on the numbered hotspots on the image to learn more about specific features. The sidebar will provide detailed information for each selected hotspot. Enjoy your exploration!",
    ctaPButton: "Start Exploring Now",
    ctaPLink: "#", // Can be a link to another section or page
    ctaPtarget: "_self",
    ctaPText: "Let's dive in!",
  };

  const mockToolTips: LocalHotspotInfo[] = [
    {
      index: 0,
      hotspotName: "Automated Scheduling",
      hotspotSubTitle: "Set it and forget it",
      topPos: 25,
      leftPos: 30,
      multilineName: true,
      infoHeader: "Advanced Automated Scheduling",
      infoParagraph: "Our platform allows you to schedule tasks and workflows with unparalleled precision and flexibility. Save time and reduce manual errors.",
      infoParagraph2: "Supports complex recurring patterns and conditional triggers.",
      bulletPoints: ["Easy drag-and-drop interface", "Real-time monitoring", "Customizable notifications"],
      ctaBodyText: "Ready to streamline your operations?",
      ctaButtonText: "Learn More",
      ctaButtonLink: "#scheduling-feature",
      altCtaBodyText: "Need enterprise features?",
      altCtaButtonText: "Contact Sales",
      altCtaButtonLink: "#contact-sales",
    },
    {
      index: 1,
      hotspotName: "Real-time Analytics\n& Reporting",
      hotspotSubTitle: "Insights at your fingertips",
      topPos: 50,
      leftPos: 65,
      multilineName: true,
      infoHeader: "Powerful Real-time Analytics",
      infoParagraph: "Gain actionable insights with our comprehensive analytics dashboard. Track key metrics and generate custom reports on the fly.",
      bulletPoints: ["Customizable dashboards", "Export data in multiple formats", "Integration with third-party tools"],
      ctaBodyText: "Make data-driven decisions.",
      ctaButtonText: "View Demo Dashboard",
      ctaButtonLink: "#analytics-demo",
    },
    {
      index: 2,
      hotspotName: "Collaborative Workspace",
      hotspotSubTitle: "Teamwork made easy",
      topPos: 70,
      leftPos: 40,
      infoHeader: "Seamless Collaboration",
      infoParagraph: "Enable your team to work together efficiently with shared workspaces, version control, and role-based access.",
      bulletPoints: ["Shared task lists", "Version history", "Secure file sharing"],
      altCtaBodyText: "Explore integration options.",
      altCtaButtonText: "See Integrations",
      altCtaButtonLink: "#integrations",
    },
  ];

  // Ensure the image path is correct and the image exists in `apps/demo/public/`
  const imageDetails = {
    url: "./image.jpeg", // Relative to the public folder
    alt: "Interactive product demonstration",
  };

  return (
    <MainLayout>
      <Head>
        <title>Contentful Hotspot Configurator | New Demo</title>
      </Head>
      <HotspotImageNew
        image={imageDetails}
        ToolTips={mockToolTips}
        sectionHeading={mockSectionHeading}
        // Optionally pass initialSidebarIndex or initialViewIntro
        // initialViewIntro={true} 
        // initialSidebarIndex={0}
      />
    </MainLayout>
  );
};

export default Demo;
