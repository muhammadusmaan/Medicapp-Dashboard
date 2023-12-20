import React from 'react'
import { MultiSelect } from "react-multi-select-component"

function MultipleSelect({ options, value, changeHandler, label, hasError, errorMessage, defaultValue, hasSelectAll }) {

	return (
		<>
			<div>
				<MultiSelect
					options={options}
					hasSelectAll={hasSelectAll}
					isLoading={false}
					shouldToggleOnHover={false}
					disableSearch={false}
					defaultValue={defaultValue}
					value={value}
					disabled={false}
					onChange={changeHandler}
					labelledBy={label}
					overrideStrings={{ "selectSomeItems": label }}
					className={hasError ? "multi-select error-border text-left" : "multi-select text-left"}
				/>
			</div>
			{hasError ? (
				<div className="multiselect-error-message">{errorMessage}</div>
			) : null}
		</>
	)
}

export default MultipleSelect
