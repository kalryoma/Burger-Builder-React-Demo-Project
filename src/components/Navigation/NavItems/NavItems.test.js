import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";

import NavItems from "./NavItems";
import Navitem from "./NavItem/NavItem";

configure({ adapter: new Adapter() });

describe("<NavItems />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <NavItems />
      </BrowserRouter>
    );
  });

  it("should render 2 <NavItem />s if not authenticated", () => {
    expect(wrapper.find(Navitem)).toHaveLength(2);
  });
});
