import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid ${(props) =>
            props.type === "white"
                    ? "var(--color-grey-100)"
                    : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

function Select({options, onChange, value, type}) {
  return (
    <StyledSelect value={value} onChange={onChange} type={type}>
      {options.map(
        item => <option key={item.value} value={item.value}>{item.label}</option>
      )}
    </StyledSelect>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string, label: PropTypes.string})),
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default Select;