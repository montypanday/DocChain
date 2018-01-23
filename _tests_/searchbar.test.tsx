import * as React from "react";
import { SearchBar } from "../clientapp/components/featurebar/searchbar";
import * as renderer from "react-test-renderer";

test("Link changes the class when hovered", () => {
    const changeHandler = jest.fn();
    const searchHandler = jest.fn();
    const component = renderer.create(
        <SearchBar
            changeHandler={changeHandler}
            searchHandler={searchHandler}>
        </SearchBar>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});