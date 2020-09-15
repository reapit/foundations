import { css } from 'linaria'

export const elCheckbox = css`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  /* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ span {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  & input:checked ~ span {
    background-color: #2196f3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  span:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  & input:checked ~ span:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  & span:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`
