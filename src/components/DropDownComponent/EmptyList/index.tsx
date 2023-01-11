import React, { ReactNode } from 'react';
import './style.scss'

const examples: any = {
    "profession": "COMMON_SEARCH_TIP_PROFESSION_EX",
    "fields of interest": "COMMON_SEARCH_TIP_INTEREST_FIELD_EX"
}

interface IEmptyList {
    exFor?: keyof typeof examples
    content?: string | ReactNode
}

const EmptyList: React.FC<IEmptyList> = ({ exFor, content }): JSX.Element => {

    if (!!exFor) {
        return (
            <div className={"no-content"}>
                <p>none</p>
                <ul>
                   <li>adadasd</li>
                </ul>
            </div>
        )
    }

    return (
        <div className={"no-content"}>
            {(content ?? 'No Content')}
        </div>
    )
}

export default EmptyList