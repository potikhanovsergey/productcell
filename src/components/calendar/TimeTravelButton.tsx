import { Show, observer } from "@legendapp/state/react";
import { drawerDetails } from "@/store/LegendStore";
import PrimaryButton from "../PrimaryButton";

const TimeTravelButton = () => {
  return (
    <Show if={drawerDetails}>
      {() => (
        <PrimaryButton
          fullWidth
          target="_blank"
          component="a"
          href={`https://producthunt.com/time-travel/${drawerDetails
            .get()
            .date?.format("YYYY/MM/DD")}`}
        >
          Product Hunt time travel
        </PrimaryButton>
      )}
    </Show>
  );
};

export default observer(TimeTravelButton);
