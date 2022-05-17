import { shallow } from "enzyme";
import ListRow from "../ListRow";

describe("List row", () => {
  let props;
  props = {
    label: "Moves Taken",
    content: "10"
  };

  it("should render correctly", () => {
    const wrapper = shallow(<ListRow {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
