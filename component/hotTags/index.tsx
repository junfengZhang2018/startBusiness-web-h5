import React from "react";
import { Tag } from "antd";
import './index.scss'

const { CheckableTag } = Tag;

export default class HotTags extends React.Component<any> {
    state = {
        selectedTags: [],
    };

    handleChange(tag, checked, keyValue) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [tag] : selectedTags.filter(t => t[keyValue.value] !== tag[keyValue.value]);
        this.setState({ selectedTags: nextSelectedTags });
        this.props.onChange(nextSelectedTags);
    }

    render() {
        const { selectedTags } = this.state;
        const { type, data, keyValue } = this.props.data;
        return (
            <div className="wrap">
                <span style={{ marginRight: 8 }}>{type}:</span>
                {data.map((tag) => (
                    <CheckableTag
                        key={tag[keyValue.value]}
                        checked={selectedTags.some(item => item[keyValue.value] === tag[keyValue.value])}
                        onChange={(checked) => this.handleChange(tag, checked, keyValue)}
                    >
                        {tag[keyValue.key]}
                    </CheckableTag>
                ))}
            </div>
        );
    }
}
