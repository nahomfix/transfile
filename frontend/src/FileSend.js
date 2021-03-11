import React, { Component } from 'react';
import { Upload, Button, Input, Card, Space, Typography } from 'antd';
import { UploadOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';

class FileSend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            fileList: [],
            uploading: false,
            link: ''
        }
    }

    handleMessage = (event) => {
        this.setState({
            message: event.target.value
        });
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
            formData.append('message', this.state.message.trim());
        });

        this.setState({
            uploading: true,
        });


        axios.post(`${window.location.protocol}//${window.location.host}/uploads`, formData)
            .then((res) => this.setState({ link: `${window.location.protocol}//${window.location.host}/${res.data.data.slug}`, uploading: false }))
            .catch((err) => this.setState({ uploading: false }));

        // You can use any AJAX library you like
        // reqwest({
        //     url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //     method: 'post',
        //     processData: false,
        //     data: formData,
        //     success: () => {
        //         this.setState({
        //             fileList: [],
        //             uploading: false,
        //         });
        //         message.success('upload successfully.');
        //     },
        //     error: () => {
        //         this.setState({
        //             uploading: false,
        //         });
        //         message.error('upload failed.');
        //     },
        // });
        // console.log({ "file": formData.get('file'), "message": formData.get('message') });
    };

    resetLink = () => {
        this.setState({
            link: '',
            fileList: [],
            message: ''
        })
    }

    render() {
        const { TextArea } = Input;
        const { uploading, fileList } = this.state;
        const { Link, Title, Paragraph } = Typography;

        const props = {
            maxCount: 1,
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList,
            progress: {
                strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                },
                strokeWidth: 3,
                format: percent => `${parseFloat(percent.toFixed(2))}%`
            }
        };

        return (
            <>
                <Card style={{ textAlign: 'center' }}>
                    <Space align="center" direction="vertical">
                        {!this.state.link &&
                            <>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Upload File</Button>
                                </Upload>
                                <TextArea autoSize={{ minRows: 6, maxRows: 9 }} value={this.state.message} onChange={this.handleMessage} placeholder="Message..." />
                            </>}
                        {this.state.link &&
                            <>
                                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '70px' }} />
                                <Title>You're done!</Title>
                                <Title level={5}>Copy the download link below.</Title>
                            </>}
                        {this.state.link &&
                            <Link href={this.state.link} target="_blank">
                                <Paragraph copyable>
                                    {this.state.link}
                                </Paragraph>
                            </Link>}
                        {this.state.link ? <Button type="primary" shape="round" onClick={this.resetLink}>Another Link</Button> : <Button type="primary" shape="round" loading={uploading} disabled={fileList.length === 0} onClick={this.handleUpload}>Get Link</Button>}
                    </Space>
                </Card>
            </>
        )
    }
}

export default FileSend