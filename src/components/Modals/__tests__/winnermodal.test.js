import { mount } from "enzyme";
import { ConnectedComponent } from "utils/test-utils";
import WinnerModal from "../WinnerModal";

describe("List row", () => {
  let props;
  props = {
    label: "Moves Taken",
    content: "10"
  };

  it("should render correctly", () => {
    const wrapper = mount(
      <ConnectedComponent>
        <WinnerModal {...props} />
      </ConnectedComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
