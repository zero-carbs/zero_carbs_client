import { useStepper } from "@/components/ui/stepper";
// import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function StepperFormActions() {
  // const navigate = useNavigate();
  const {
    // prevStep,
    resetSteps,
    // isDisabledStep,
    hasCompletedAllSteps,
    // isLastStep,
    // isOptionalStep,
  } = useStepper();

  // const resetForm = () => {
  //   console.log('reset')
  //   navigate("/", { replace: true });
  // };

  return (
    <div className="flex w-full justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          {/* <Button */}
          {/*   disabled={isDisabledStep} */}
          {/*   onClick={prevStep} */}
          {/*   size="sm" */}
          {/*   variant="secondary" */}
          {/* > */}
          {/*   Prev */}
          {/* </Button> */}
          <Button size="sm" className="mt-20">
            Previous
            {/* {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"} */}
          </Button>
        </>
      )}
    </div>
  );
}
