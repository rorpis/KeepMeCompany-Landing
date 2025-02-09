import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useLayoutEffect,
  } from 'react';
  
  const SCROLL_SPEED = 0.1; // pixels per frame
  const COLUMN_HEIGHT = '30vh';
  
  const painPoints = [
    "Missed calls",
    "Angry patients", 
    "GPs dropping out",
    "Missed QOF targets",
    "Overburdened GPs",
    "8 AM rush chaos",
    "Rising operational costs",
    "Burnout & staff shortages",
    "Inconsistent record-keeping",
    "Practice closures overwhelm remaining practices",
    "Patients struggling to book or access care",
    "Seniors giving up on care due to digital barriers",
    "Digital exclusion driving patients to A&E",
    "Shorter appointments compromising care quality",
    "Endless hold queues frustrating patients",
    "Patients feeling unheard and dismissed",
    "Gaps in chronic disease management",
    "Increased health inequalities"
  ];
  
  //
  // Custom hook: Adjusted to scroll upward when direction is "up"
  //
  const useInfiniteScroll = (direction = 'up', hoveredColumn = null, columnIndex) => {
    const scrollPositionRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);
    const contentRef = useRef(null);
    const animationFrameRef = useRef(null);
  
    // Pause when hovered
    useEffect(() => {
      setIsPaused(hoveredColumn === columnIndex);
    }, [hoveredColumn, columnIndex]);
  
    // Set the initial offset based on direction
    useLayoutEffect(() => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight / 2;
        if (direction === 'down') {
          // For downward scrolling, start at -contentHeight.
          scrollPositionRef.current = -contentHeight;
        } else {
          // For upward scrolling, start at 0.
          scrollPositionRef.current = 0;
        }
        contentRef.current.style.transform = `translate3d(0, ${scrollPositionRef.current}px, 0)`;
      }
    }, [direction]);
  
    // Animation loop: update scroll position differently based on direction.
    const animate = useCallback(() => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight / 2;
        if (!isPaused) {
          if (direction === 'up') {
            // For upward scrolling, subtract to move the content upward.
            scrollPositionRef.current -= SCROLL_SPEED;
            // When we've scrolled past the duplicated content, reset.
            if (scrollPositionRef.current <= -contentHeight) {
              scrollPositionRef.current = 0;
            }
          } else {
            // For downward scrolling, add to move the content downward.
            scrollPositionRef.current += SCROLL_SPEED;
            if (scrollPositionRef.current >= 0) {
              scrollPositionRef.current = -contentHeight;
            }
          }
          contentRef.current.style.transform = `translate3d(0, ${scrollPositionRef.current}px, 0)`;
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    }, [direction, isPaused]);
  
    useEffect(() => {
      animationFrameRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameRef.current);
    }, [animate]);
  
    return { contentRef };
  };
  
  //
  // Column component: renders the list (and duplicate) and handles hover state.
  // A subtle border is added to each card for a light stroke effect.
  //
  const Column = ({ items, direction, columnIndex, hoveredColumn, onHover }) => {
    const { contentRef } = useInfiniteScroll(direction, hoveredColumn, columnIndex);
  
    return (
      <div 
        className="relative overflow-hidden h-full"
        onMouseEnter={() => onHover(columnIndex)}
        onMouseLeave={() => onHover(null)}
      >
        <div
          ref={contentRef}
          className="absolute w-full" // No CSS transition so that JS-driven movement is smooth.
        >
          {/* Original content */}
          {items.map((text, idx) => (
            <div
              key={`original-${idx}`}
              className="bg-gray-800 p-4 rounded-lg shadow-lg w-[97%] mx-auto mb-1.5 border border-gray-500/50"
            >
              <p className="text-white text-sm font-medium">{text}</p>
            </div>
          ))}
          {/* Duplicated content for seamless looping */}
          {items.map((text, idx) => (
            <div
              key={`duplicate-${idx}`}
              className="bg-gray-800 p-4 rounded-lg shadow-lg w-[97%] mx-auto mb-1.5 border border-gray-500/50"
            >
              <p className="text-white text-sm font-medium">{text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  //
  // Main component: three columns with columns 1 and 3 scrolling downward,
  // and column 2 scrolling upward.
  // The grid gap is reduced and gradient overlays are added at the top and bottom.
  //
  export default function InfiniteColumns() {
    const [hoveredColumn, setHoveredColumn] = useState(null);
    
    // Distribute painPoints into three columns.
    const columns = [[], [], []];
    painPoints.forEach((point, idx) => {
      columns[idx % 3].push(point);
    });
  
    return (
      <section className="bg-gray-900 text-white pt-0 pb-8 px-4">
        <div className="max-w-3xl mx-auto relative">
          {/* Wrapping the grid in a relative container so we can position gradient overlays */}
          <div 
            className="grid grid-cols-3 gap-1 relative"
            style={{ height: COLUMN_HEIGHT }}
          >
            <Column
              items={columns[0]}
              direction="down"  // Column 1 scrolls down.
              columnIndex={0}
              hoveredColumn={hoveredColumn}
              onHover={setHoveredColumn}
            />
            <Column
              items={columns[1]}
              direction="up"    // Column 2 scrolls up.
              columnIndex={1}
              hoveredColumn={hoveredColumn}
              onHover={setHoveredColumn}
            />
            <Column
              items={columns[2]}
              direction="down"  // Column 3 scrolls down.
              columnIndex={2}
              hoveredColumn={hoveredColumn}
              onHover={setHoveredColumn}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-8 pointer-events-none bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      </section>
    );
  }
  