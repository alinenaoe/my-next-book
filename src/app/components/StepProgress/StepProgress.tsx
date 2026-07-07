import styles from './StepProgress.module.css';

type StepProgressProps = {
  currentStep: number;
  totalSteps: number;
};

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={styles.container}>
      <div
        className={styles.bar}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      >
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
      <span className={styles.label}>
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
};

export default StepProgress;
