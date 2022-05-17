import { screen, render } from "@testing-library/react";
import Button from "components/Button/Button";
import { shallow } from "enzyme";

describe("Button", () => {
  let props;
  props = {
    color: "primary",
    label: "Cancel",
    onClick: jest.fn()
  };

  it("should render correctly", () => {
    const wrapper = shallow(<Button {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render according to props", () => {
    props = {
      ...props,
      label: "Submit"
    };
    render(<Button {...props} />);

    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
});
