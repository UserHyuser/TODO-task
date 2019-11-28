## MODALS USAGE GUIDE
* Main modals wrapper and core actions located in _client/src/shared/modal_
* To add new modal: import your modal in MainModal and add to "modals" array (similar worflow as for reducers)
* For modal rendering we are using react-modal with custom wrapper.
* To open/hide modal use actions from shared/modal/redux
* For internal modal logic - use own actions (see examples for more info) and pass props in showModal action

### Examples
#### Further routes would be from _client/src/containers/ExampleContainer/_
_./containers/ExampleModal_ contains example of two modals simple and custommed.
1) _./containers/ExampleModal/components/SimpleModal_ - modal with default overlay and wrapper styles. Without internal props. Should be enough for most cases, no extra coding required.
2) _./containers/ExampleModal_/components/CustomModal_ - example of modal with full override of styles for MainModal container, including overlay, warpper and passing props to modal
