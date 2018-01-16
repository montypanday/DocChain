import * as React from "react";
import { TableHeading } from "../ClientApp/components/Table";
import * as renderer from "react-test-renderer";

test("Link changes the class when hovered", () => {

    const component = renderer.create(
        <TableHeading></TableHeading>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});