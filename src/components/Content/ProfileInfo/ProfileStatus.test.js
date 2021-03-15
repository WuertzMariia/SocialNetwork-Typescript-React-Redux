import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";



describe("ProfileStatus Component", () => {
    test("props.status should be in state", () => {
        const component = create(<ProfileStatus status="hello my new status"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("hello my new status");
    });

    test("span should be inside", () => {
        const component = create(<ProfileStatus status="hello my new status"/>);
        const root = component.root;
        let pe = root.findByType("p")
        expect(pe.length).not.toBe(0);
    });
    test("after creation input should not be displayed", () => {
        const component = create(<ProfileStatus status="hello my new status"/>);
        const root = component.root;

        expect(() => {
            let inp = root.findByType("input")
        }).toThrow();
    });

    test("status should be inside", () => {
        const component = create(<ProfileStatus status="hello my new status"/>);
        const root = component.root;
        let pe = root.findByType("p")
        expect(pe.children[0]).toBe("hello my new status");
    });

    test("input should be displayed in editMode", () => {
        const component = create(<ProfileStatus status="hello my new status" updateUserStatus={()=> {}}/>);
        const root = component.root;
        let pe = root.findByType("p");
        pe.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("hello my new status");
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="hello my new status" updateUserStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});