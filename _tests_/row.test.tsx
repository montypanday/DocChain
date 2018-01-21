import * as React from "react";
import { Row } from "../ClientApp/components/Table/Row";
import * as renderer from "react-test-renderer";
import * as ReactTestUtils from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom'
//import * as ReactDOM from 'react-dom'
//import * as ReactTestUtils from 'react-dom/test-utils';

const init = () => {
    const testnavHandler = jest.fn();
    const test_delete_handler = jest.fn();

    const props = {
        type: "folder",
        filename: "sample folder",
        size: "28528",
        lastModified: "1/01/2018 6:46:08 PM",
        navHandler: { testnavHandler },
        id: "43970020269",
        mimeType: "",
        deleteHandler: { test_delete_handler },
        downloadHandler: "",
        renameHandler: "",
        shareLinkHandler: "",
        platform: "testPlatform",
        secure: "",
    }

    const component = renderer.create(
        <Row {...props}></Row>,
    );

    return component;
}

test("Whether the componet is right rendered", () => {
   
    const component = init();

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //// manually trigger the callback
    //tree.props.onMouseEnter();
    //// re-rendering
    //tree = component.toJSON();
    //expect(tree).toMatchSnapshot();

    //// manually trigger the callback
    //tree.props.onMouseLeave();
    //// re-rendering
    //tree = component.toJSON();
    //expect(tree).toMatchSnapshot();
});

const findChildrenByClassName = (element: Element, className: string) => {
    const childrenList = element.children;
    const resultList = new Array<Element>();
    for (var i = 0; i < element.childElementCount; i++) {
        var childNode = new Element;
        childNode = childrenList[i];
        if (childNode.classList.contains(className)) {
            resultList.push(childNode);
        }
    }
    return resultList;
}

const getChildren = () => {
    const component = init();
    const dropdown = findChildrenByClassName(component, "dropdown")[0];
    //const dropdownButton = dropdown.children[0];
    const contextMenu = findChildrenByClassName(component, "dropdown")[1];

    return {
        dropdown: dropdown,
        //dropdownButton: dropdownButton,
        contextMenu: contextMenu,
    };
}

describe("test on getChildren", () => {
    const childrenNode = getChildren();
    const dropdown = childrenNode.dropdown;
    const contextMenu = childrenNode.contextMenu;

    it('dropdown', () => {
        expect(dropdown.tagName).toBe("div")
    });

    it('contextMenu', () => {
        expect(contextMenu.tagName).toBe("div")
    });
});


describe("test on functions", () => {
    const component = init();
    const childrenNode = getChildren();
    const dropdown = childrenNode.dropdown;
    const dropdownButton = childrenNode.dropdown;
    const contextMenu = childrenNode.contextMenu;

    it('Clicked', () => {
        ReactTestUtils.Simulate.click(dropdownButton);
        expect(dropdown.classList).toContain("open");
    });

    it('Right clicked', () => {
        ReactTestUtils.Simulate.contextMenu(component);
        expect(contextMenu.classList).toContain("open");
    });

});

