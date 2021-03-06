import { useState, useRef, useEffect } from 'react';
import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { observer } from 'mobx-react-lite';
import useStore from '@/store';
import { http } from '@/utils';

import 'react-quill/dist/quill.snow.css'
import './index.scss'

const { Option } = Select;

function Publish() {
  const [fileList, setFileList] = useState([]);
  const [imgCount, setImgCount] = useState(1);

  const fileListRef = useRef([]);
  const form = useRef(null);

  const { channelStore } = useStore();

  const [params] = useSearchParams();
  const articleId = params.get('id');

  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${articleId}`);
      const { cover, ...formValue } = res.data;
      form.current.setFieldsValue({ ...formValue, type: cover.type });
      const imageList = cover.images.map(url => ({ url }));
      setFileList(imageList);
      setImgCount(cover.type);
      fileListRef.current = imageList;
    }
    if (articleId) {
      getArticle();
    }
  }, [articleId]);

  const onUploadChange = (info) => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file;
    })
    setFileList(fileList);
    fileListRef.current = fileList;
  }

  const changeType = e => {
    const count = e.target.value;
    setImgCount(count);

    if (count === 1) {
      const firstImg = fileListRef.current[0];
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      setFileList(fileListRef.current)
    }
  }

  const navigate = useNavigate();
  const onPublish = async (values) => {
    const { type, ...rest } = values;
    const params = {
      ...rest,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    if (articleId) {
      await http.put(`/mp/articles/${params.id}?draft=false`, params);
    }
    await http.post('/mp/articles?draft=false', params);

    navigate('/article');
    message.success('Sucess!')
  }

  return (
    <div className='publish'>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">??????</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {articleId ? '????????????' : '????????????'}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}
          onFinish={onPublish}
          ref={form}
        >
          <Form.Item
            label="??????"
            name="title"
            rules={[{ required: true, message: '?????????????????????' }]}
          >
            <Input placeholder="?????????????????????" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="??????"
            name="channel_id"
            rules={[{ required: true, message: '?????????????????????' }]}
          >
            <Select placeholder="?????????????????????" style={{ width: 200 }}>
              {channelStore.channelList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
              )}
            </Select>
          </Form.Item>

          <Form.Item label="??????">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>??????</Radio>
                <Radio value={3}>??????</Radio>
                <Radio value={0}>??????</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={imgCount}
                multiple={imgCount > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="??????"
            name="content"
            rules={[{ required: true, message: '?????????????????????' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="?????????????????????"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '????????????' : '????????????'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
};

export default observer(Publish);
