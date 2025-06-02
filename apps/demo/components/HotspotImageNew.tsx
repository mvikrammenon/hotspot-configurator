import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Image, Card, Button, Accordion } from 'react-bootstrap';
import { ChevronRight, ChevronLeft } from 'react-bootstrap-icons'; // Example icons
import HotspotTooltipNew from './HotspotTooltipNew';
import styles from './HotspotImageNew.module.scss';

// --- TypeScript Interfaces ---

interface HotspotInfo {
  // Fields from HotspotTooltipNewProps
  index: number;
  hotspotName: string;
  hotspotSubTitle: string;
  topPos: number;
  leftPos: number;
  multilineName?: boolean;

  // Additional fields for sidebar/accordion content
  infoHeader?: string;
  infoParagraph?: string;
  infoParagraph2?: string;
  bulletPoints?: string[];
  ctaBodyText?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  altCtaBodyText?: string;
  altCtaButtonText?: string;
  altCtaButtonLink?: string;
}

interface SectionHeading {
  titleLine1?: string;
  titleLine2?: string;
  subTitle?: string;
  body?: string;
  ctaPText?: string;
  ctaPButton?: string;
  ctaPLink?: string; 
  ctaPtarget?: string;
}

interface HotspotImageNewProps {
  image: {
    url: string;
    alt?: string;
  };
  ToolTips: HotspotInfo[];
  sectionHeading?: SectionHeading;
  initialSidebarIndex?: number; // To control initial open state from parent
  initialViewIntro?: boolean; // To control initial view from parent
}

// --- Component Implementation ---

const HotspotImageNew: React.FC<HotspotImageNewProps> = ({
  image,
  ToolTips = [],
  sectionHeading = {},
  initialSidebarIndex = 0,
  initialViewIntro = true,
}) => {
  const [sideBarIndex, setSideBarIndex] = useState<number>(initialSidebarIndex);
  const [viewIntro, setViewIntro] = useState<boolean>(initialViewIntro);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedHoverIndex, setSelectedHoverIndex] = useState<number | null>(null);
  const [isAnimated, setIsAnimated] = useState<boolean>(false); // For slide-in animation

  const validToolTips = Array.isArray(ToolTips) ? ToolTips : [];

  useEffect(() => {
    setViewIntro(initialViewIntro);
  }, [initialViewIntro]);

  useEffect(() => {
    setSideBarIndex(initialSidebarIndex);
  }, [initialSidebarIndex]);
  
  useEffect(() => {
    if (!viewIntro && selectedIndex !== null) {
      setIsAnimated(true); // Trigger animation when a hotspot is selected
      const timer = setTimeout(() => setIsAnimated(false), 500); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [selectedIndex, viewIntro]);


  const hotspotOnClick = useCallback((index: number) => {
    setSelectedIndex(prevIndex => (prevIndex === index ? null : index)); // Toggle selection
    setSideBarIndex(index); // Keep sidebar in sync
    setViewIntro(false); // Always hide intro when a hotspot is clicked
    setSelectedHoverIndex(null); // Clear hover when clicked
  }, []);

  const hotspotOnMouseEnter = useCallback((index: number) => {
    setSelectedHoverIndex(index);
  }, []);

  const hotspotOnMouseLeave = useCallback(() => {
    setSelectedHoverIndex(null);
  }, []);

  const hideStartExplore = useCallback(() => {
    setViewIntro(false);
    if (validToolTips.length > 0) {
      setSelectedIndex(validToolTips[0].index); // Select first hotspot by default
      setSideBarIndex(validToolTips[0].index);
    }
  }, [validToolTips]);

  const keepExploring = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setViewIntro(false);
    setSelectedIndex(null); // No specific hotspot selected, show generic sidebar or nothing
    // Or, select the first one if that's the desired behavior
    // if (validToolTips.length > 0) {
    //   setSelectedIndex(validToolTips[0].index);
    //   setSideBarIndex(validToolTips[0].index);
    // }
  }, [setViewIntro, setSelectedIndex]); // Removed sideBarIndex from here as it's not used.

  const keepExploring = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setViewIntro(false); // Ensure intro is hidden

    if (validToolTips.length === 0) return;

    let currentArrayIndex = -1;
    if (selectedIndex !== null) {
      currentArrayIndex = validToolTips.findIndex(t => t.index === selectedIndex);
    }

    // If nothing is selected, or current not found (e.g. data changed), start from the first hotspot
    // Otherwise, go to the next one.
    let nextArrayIndex = (currentArrayIndex === -1) ? 0 : currentArrayIndex + 1;

    if (nextArrayIndex >= validToolTips.length) {
      nextArrayIndex = 0; // Wrap around
    }

    if (validToolTips[nextArrayIndex]) {
      const nextHotspotGlobalIndex = validToolTips[nextArrayIndex].index;
      setSelectedIndex(nextHotspotGlobalIndex);
      setSideBarIndex(nextHotspotGlobalIndex); // Keep sideBarIndex in sync
    }
  }, [selectedIndex, validToolTips, setViewIntro, setSelectedIndex, setSideBarIndex]);
  
  const currentHotspotData = selectedIndex !== null ? validToolTips.find(t => t.index === selectedIndex) : null;

  const renderSidebarContent = () => {
    const data = currentHotspotData;
    if (viewIntro || !data) {
      return (
        <Card.Body className={styles.sidebarIntro}>
          {sectionHeading.titleLine1 && <Card.Title as="h2">{sectionHeading.titleLine1}</Card.Title>}
          {sectionHeading.titleLine2 && <Card.Title as="h3">{sectionHeading.titleLine2}</Card.Title>}
          {sectionHeading.subTitle && <Card.Subtitle className="mb-2 text-muted">{sectionHeading.subTitle}</Card.Subtitle>}
          {sectionHeading.body && <Card.Text>{sectionHeading.body}</Card.Text>}
          {sectionHeading.ctaPButton && (
            <Button variant="primary" href={sectionHeading.ctaPLink} target={sectionHeading.ctaPtarget} onClick={hideStartExplore}>
              {sectionHeading.ctaPButton}
            </Button>
          )}
          {sectionHeading.ctaPText && <p className="mt-2">{sectionHeading.ctaPText}</p>}
        </Card.Body>
      );
    }

    return (
      <Card.Body className={`${styles.sidebarDetail} ${isAnimated ? styles.slideInContent : ''}`}>
        {data.infoHeader && <Card.Title as="h4">{data.infoHeader}</Card.Title>}
        {data.infoParagraph && <Card.Text>{data.infoParagraph}</Card.Text>}
        {data.infoParagraph2 && <Card.Text>{data.infoParagraph2}</Card.Text>}
        {data.bulletPoints && (
          <ul>
            {data.bulletPoints.map((bp, i) => <li key={i}>{bp}</li>)}
          </ul>
        )}
        {data.ctaBodyText && <Card.Text>{data.ctaBodyText}</Card.Text>}
        {data.ctaButtonText && (
          <Button variant="primary" href={data.ctaButtonLink} className="mt-2">
            {data.ctaButtonText} <ChevronRight />
          </Button>
        )}
        {data.altCtaBodyText && <Card.Text className="mt-3">{data.altCtaBodyText}</Card.Text>}
        {data.altCtaButtonText && (
          // Using Button with variant="link" for TextButton/GhostButton appearance
          <Button variant="link" href={data.altCtaButtonLink} className="mt-1 p-0"> 
            {data.altCtaButtonText}
          </Button>
        )}
        <Button variant="outline-secondary" className="mt-4" onClick={keepExploring}>
          <ChevronLeft /> Keep Exploring
        </Button>
      </Card.Body>
    );
  };

  const renderMobileAccordion = () => {
    if (viewIntro) {
      return (
        <div className={styles.mobileIntro}>
          {sectionHeading.titleLine1 && <h4>{sectionHeading.titleLine1}</h4>}
          {sectionHeading.subTitle && <p>{sectionHeading.subTitle}</p>}
          {sectionHeading.ctaPButton && (
            <Button variant="primary" onClick={hideStartExplore} className="w-100">
              {sectionHeading.ctaPButton}
            </Button>
          )}
        </div>
      );
    }
    return (
      <Accordion activeKey={selectedIndex !== null ? String(selectedIndex) : undefined} className={styles.mobileAccordion}>
        {validToolTips.map((hotspot) => (
          <Accordion.Item eventKey={String(hotspot.index)} key={hotspot.index}>
            <Accordion.Header onClick={() => hotspotOnClick(hotspot.index)}>
              {hotspot.hotspotName}
            </Accordion.Header>
            <Accordion.Body className={styles.slideInContent}>
              {hotspot.infoHeader && <Card.Title as="h5">{hotspot.infoHeader}</Card.Title>}
              {hotspot.infoParagraph && <p>{hotspot.infoParagraph}</p>}
              {hotspot.infoParagraph2 && <p>{hotspot.infoParagraph2}</p>}
              {hotspot.bulletPoints && (
                <ul>
                  {hotspot.bulletPoints.map((bp, i) => <li key={i}>{bp}</li>)}
                </ul>
              )}
              {hotspot.ctaBodyText && <p>{hotspot.ctaBodyText}</p>}
              {hotspot.ctaButtonText && (
                <Button variant="primary" size="sm" href={hotspot.ctaButtonLink} className="mt-2">
                  {hotspot.ctaButtonText} <ChevronRight />
                </Button>
              )}
              {hotspot.altCtaBodyText && <p className="mt-3">{hotspot.altCtaBodyText}</p>}
              {hotspot.altCtaButtonText && (
                <Button variant="link" size="sm" href={hotspot.altCtaButtonLink} className="mt-1 p-0">
                  {hotspot.altCtaButtonText}
                </Button>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  };

  return (
    <Container fluid className={styles.hotspotImageContainer}>
      <Row>
        {/* Image Column */}
        <Col md={8} className={`${styles.imageColumn} ${viewIntro ? styles.imageColumnIntro : ''}`}>
          <div className={`${styles.imageWrapper} position-relative`}>
            <Image src={image.url} alt={image.alt || 'Hotspot background'} fluid className={styles.imageStyles} />
            {!viewIntro && validToolTips.map((tooltip) => (
              <HotspotTooltipNew
                key={tooltip.index}
                {...tooltip}
                isClicked={selectedIndex === tooltip.index}
                isHovered={selectedHoverIndex === tooltip.index && selectedIndex !== tooltip.index}
                onClick={() => hotspotOnClick(tooltip.index)}
                onMouseEnter={() => hotspotOnMouseEnter(tooltip.index)}
                onMouseLeave={hotspotOnMouseLeave}
              />
            ))}
          </div>
        </Col>

        {/* Sidebar Column (Desktop) */}
        <Col md={4} className={`${styles.sidebarColumn} d-none d-md-block ${viewIntro ? styles.sidebarColumnIntro : ''}`}>
          <Card className={`${styles.sidebarCard} ${viewIntro && sectionHeading.ctaPButton ? styles.hideDuringIntro : ''}`}>
            {renderSidebarContent()}
          </Card>
        </Col>
      </Row>

      {/* Mobile Accordion Area */}
      <Row className="d-md-none">
        <Col>
          {renderMobileAccordion()}
        </Col>
      </Row>
    </Container>
  );
};

export default HotspotImageNew;
