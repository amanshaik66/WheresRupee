// src/components/SerialInput.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInput, resetInput } from '../store/inputSlice';
import { INPUT_STATES } from '../utils/constants';

function SerialInput() {
  const { value, state, errorMessage } = useSelector((state) => state.input);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setInput({ value: e.target.value }));
  };

  const handleReset = () => {
    dispatch(resetInput());
  };

  return (
    <div>
      <input
        type="text"
        maxLength={9}
        placeholder="1AA123456"
        value={value}
        onChange={handleChange}
        aria-label="Enter Serial Number"
        className={state === INPUT_STATES.INVALID ? 'input-error' : 'input-success'}
      />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      <button onClick={handleReset} disabled={state === INPUT_STATES.EMPTY}>
        Reset
      </button>
    </div>
  );
}

export default SerialInput;