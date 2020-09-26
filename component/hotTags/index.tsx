import React from "react";
import { Tag } from "antd";
import './index.scss'

const { CheckableTag } = Tag;

export default class HotTags extends React.Component<any> {
    state = {
        selectedTags: [],
    };

    handleChange(tag, checked) {
        // const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [tag] : [];
        // console.log("You are interested in: ", nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
        console.log(this.state.selectedTags)
        this.props.onChange(nextSelectedTags);
    }

    render() {
        const { selectedTags } = this.state;
        const { type, data, keyValue = {key: 'label', value: 'value'} } = this.props.data;
        return (
            <div>
                <span style={{ marginRight: 8 }}>{type}:</span>
                {data.map((tag) => (
                    <CheckableTag
                        key={tag[keyValue.value]}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={(checked) => this.handleChange(tag, checked)}
                    >
                        {tag[keyValue.key]}
                    </CheckableTag>
                ))}
            </div>
        );
    }
}
