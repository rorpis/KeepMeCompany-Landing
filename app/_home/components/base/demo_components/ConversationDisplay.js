import { Loader2 } from 'lucide-react';

const ConversationDisplay = ({
    hasStartedPlaying,
    timestamps,
    shouldShow,
    handleNewLine,
    styles,
    AnimatedLine,
    currentTime,
    isPlaying
  }) => {
    const isLoading = hasStartedPlaying && currentTime < timestamps.patient.info && isPlaying;

    return (
      <div className={`
        ${styles.section}
        p-4
        text-white
        transition-all
        duration-${styles.animationDuration}
        ease-in-out
        ${hasStartedPlaying ? 'flex-1' : 'w-full'}
        relative
      `}>
        {/* Loading Spinner */}
        <div className={`
          absolute
          top-4
          right-4
          transition-opacity
          duration-300
          ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          z-10
        `}>
          <Loader2 className="w-6 h-6 animate-spin text-white/60" />
        </div>

        <h3 className="text-xl font-semibold mb-3">Conversation Summary</h3>
        
        <div className="space-y-3">
          {/* Patient Section */}
          <div className="flex items-baseline">
            <p className={styles.sectionHeader}>Patient:</p>
            <div className="ml-2">
              <AnimatedLine 
                show={shouldShow(timestamps.patient.info)}
                content={<span className="text-sm">Alex Morgan, 33</span>}
                onRender={handleNewLine}
                timestamp={timestamps.patient.info}
              />
            </div>
          </div>
  
          {/* Primary Condition Section */}
          <div>
            <p className={`${styles.sectionHeader} mb-1.5`}>Primary Condition or Complaint</p>
            <AnimatedLine 
              show={shouldShow(timestamps.condition.main)}
              content={<p className="text-sm">Weight loss and anxiety</p>}
              onRender={handleNewLine}
              timestamp={timestamps.condition.main}
            />
          </div>
  
          {/* Symptoms Section */}
          <div>
            <p className={`${styles.sectionHeader} mb-1.5`}>Primary Symptoms</p>
            <ul className="list-disc list-inside text-sm">
              <AnimatedLine 
                show={shouldShow(timestamps.symptoms.weightLoss)}
                content={<li>Weight loss</li>}
                onRender={handleNewLine}
                timestamp={timestamps.symptoms.weightLoss}
              />
              <AnimatedLine 
                show={shouldShow(timestamps.symptoms.anxiety)}
                content={<li>Constant anxiety</li>}
                onRender={handleNewLine}
                timestamp={timestamps.symptoms.anxiety}
              />
              <AnimatedLine 
                show={shouldShow(timestamps.symptoms.jitteriness)}
                content={<li>Jitteriness</li>}
                onRender={handleNewLine}
                timestamp={timestamps.symptoms.jitteriness}
              />
              <AnimatedLine 
                show={shouldShow(timestamps.symptoms.nervousness)}
                content={<li>Nervousness</li>}
                onRender={handleNewLine}
                timestamp={timestamps.symptoms.nervousness}
              />
              <AnimatedLine 
                show={shouldShow(timestamps.symptoms.irritability)}
                content={<li>Irritability</li>}
                onRender={handleNewLine}
                timestamp={timestamps.symptoms.irritability}
              />
              <AnimatedLine 
                show={shouldShow(timestamps.symptoms.insomnia)}
                content={<li>Insomnia</li>}
                onRender={handleNewLine}
                timestamp={timestamps.symptoms.insomnia}
              />
            </ul>
          </div>
  
          {/* Pattern Section */}
          <div>
            <p className={`${styles.sectionHeader} mb-1.5`}>Pattern</p>
            <ul className="list-disc list-inside text-sm">
              <AnimatedLine 
                show={shouldShow(timestamps.pattern.duration)}
                content={<li>Duration: 3 months</li>}
                onRender={handleNewLine}
                timestamp={timestamps.pattern.duration}
              />
            </ul>
          </div>
  
          {/* Others Section */}
          <div>
            <p className={`${styles.sectionHeader} mb-1.5`}>Others</p>
            <ul className="list-disc list-inside text-sm">
              <AnimatedLine 
                show={shouldShow(timestamps.others.appetite)}
                content={<li>Increased appetite</li>}
                onRender={handleNewLine}
                timestamp={timestamps.others.appetite}
              />
              <AnimatedLine 
                show={shouldShow(timestamps.others.headaches)}
                content={<li>No headaches reported</li>}
                onRender={handleNewLine}
                timestamp={timestamps.others.headaches}
              />
              <AnimatedLine 
                show={shouldShow(timestamps.others.changes)}
                content={<li>No recent changes in work or personal life reported</li>}
                onRender={handleNewLine}
                timestamp={timestamps.others.changes}
              />
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConversationDisplay;