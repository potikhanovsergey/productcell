import { Show, observer } from "@legendapp/state/react";
import { drawerDetails } from "@/store/LegendStore";
import PrimaryButton from "../PrimaryButton";

const TimeTravelButton = () => {
  const details = drawerDetails.get();

  return (
    <Show if={details.date}>
      {() => (
        <PrimaryButton
          fullWidth
          target="_blank"
          component="a"
          href={`https://producthunt.com/time-travel/${details.date?.format(
            "YYYY/MM/DD"
          )}`}
        >
          Product Hunt time travel
        </PrimaryButton>
      )}
    </Show>
  );
};

export default observer(TimeTravelButton);
