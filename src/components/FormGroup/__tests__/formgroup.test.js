import { shallow } from "enzyme";
import FormGroup from "../FormGroup";

describe("Form Group", () => {
  let props;
  props = {
    inputs: ["Icons", "Numbers"],
    label: "Select Theme",
    onChange: jest.fn()
  };

  it("should render correctly", () => {
    const wrapper = shallow(<FormGroup {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
