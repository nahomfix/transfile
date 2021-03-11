import React, { Component } from 'react'
import { Card, Divider, Button, Typography, Spin, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import fileDownload from 'js-file-download';

export class DownloadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            filename: '',
            file: null,
            loading: true
        }
    }


    componentDidMount() {
        axios.get(`${window.location.protocol}//${window.location.host}/uploads/${this.props.match.params.slug}`)
            .then((res) => {
                this.setState({
                    message: res.data.message,
                    filename: res.data.name,
                    loading: false
                });
            })
            .catch((err) => {
                this.setState({
                    message: 'File not found!',
                });
                console.log(this.props.history.push('/404'));
            });
    }

    download = () => {
        let blob = new Blob([new Uint8Array(this.state.file.data)]);
        fileDownload(blob, this.state.filename);
    }

    downloadFile = () => {
        axios({
            url: `${window.location.protocol}//${window.location.host}/download/${this.props.match.params.slug}`,
            method: 'GET',
            responseType: 'blob'
        })
            .then((res) => {
                message.info('Download started.');
                fileDownload(res.data, this.state.filename);
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { Title, Text } = Typography;
        return (
            <div>
                <Card style={{ minWidth: '240px', textAlign: 'center' }}>
                    {this.state.loading && <Spin tip="Fetching file from server please wait..."></Spin>}
                    {!this.state.loading &&
                        <>
                            <DownloadOutlined style={{ fontSize: '70px', color: '#ccc' }} />
                            <Title level={4}>Ready when you are!</Title>
                            <Text type="secondary">Link expires in 24 hours</Text>
                            <Divider />
                            <p style={{ textAlign: 'left' }}>{this.state.message}</p>
                            <Divider />
                            <p style={{ textAlign: 'left' }}>{this.state.filename}</p>
                            <Divider />
                            <Button type="primary" shape="round" onClick={this.downloadFile}>Download</Button>
                        </>}
                </Card>
                {/* <img src={this.state.image} alt="" /> */}
            </div>
        )
    }
}

export default DownloadFile
