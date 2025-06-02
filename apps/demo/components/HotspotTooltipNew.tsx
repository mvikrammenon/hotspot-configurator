import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';
import styles from './HotspotTooltipNew.module.scss';

interface HotspotTooltipNewProps {
  index: number;
  onClick?: (index: number) => void;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: (index: number) => void;
  isClicked?: boolean;
  isHovered?: boolean;
  topPos: number;
  leftPos: number;
  multilineName?: boolean;
  hotspotName: string;
  hotspotSubTitle: string;
}

const HotspotTooltipNew: React.FC<HotspotTooltipNewProps> = ({
  index,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isClicked,
  isHovered,
  topPos,
  leftPos,
  multilineName,
  hotspotName,
  hotspotSubTitle,
}) => {
  const [isSelected, setIsSelected] = useState(isClicked || isHovered || false);

  useEffect(() => {
    setIsSelected(isClicked || isHovered || false);
  }, [isClicked, isHovered]);

  const handleTooltipClick = () => {
    onClick?.(index);
  };

  const handleTooltipMouseEnter = () => {
    onMouseEnter?.(index);
  };

  const handleTooltipMouseLeave = () => {
    onMouseLeave?.(index);
  };

  return (
    <div style={{ top: `${topPos}%`, left: `${leftPos}%` }} className="position-absolute">
      <Button
        data-test-id={`hotspot-${index}`}
        className={`${styles.btnCircle} ${styles.btnCircleSm} ${styles.hotspotX}`}
        onClick={handleTooltipClick}
        onMouseEnter={handleTooltipMouseEnter}
        onMouseLeave={handleTooltipMouseLeave}
      >
        <InfoCircleFill size={24} /> {/* Adjusted size, can be configured */}
      </Button>
      <div
        data-test-id={`tooltip-${index}`}
        className={`
          ${styles.rectangle} 
          ${styles.hotspotX} 
          ${styles.label} 
          text-md 
          align-items-center 
          ${isSelected ? styles.tooltipSelected : 'opacity-0'}
          ${multilineName ? 'd-block' : 'd-flex'}
        `}
        onClick={handleTooltipClick}
        onMouseEnter={handleTooltipMouseEnter}
        onMouseLeave={handleTooltipMouseLeave}
      >
        <span className={styles.tooltipTitle}>
          {hotspotName.split('\n').map((item, key) => (
            <div key={`${item}-${key}`}>{item}</div>
          ))}
        </span>
        <span className={styles.tooltipSubtitle}>
          {hotspotSubTitle.split('\n').map((item, key) => (
            <div key={`${item}-${key}`}>{item}</div>
          ))}
        </span>
      </div>
      <div
        className={`
          ${styles.triangle} 
          ${styles.hotspotX} 
          ${isSelected ? styles.tooltipTriangleSelected : 'opacity-0'}
        `}
        onMouseEnter={handleTooltipMouseEnter}
        onMouseLeave={handleTooltipMouseLeave}
      ></div>
    </div>
  );
};

export default HotspotTooltipNew;
