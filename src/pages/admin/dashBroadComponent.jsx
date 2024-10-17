import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, HomeOutlined, DollarOutlined, BarChartOutlined } from '@ant-design/icons';

const Dashboard = () => {
    return (
        <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Dashboard Overview</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        title="Total Users"
                        bordered={false}
                        style={{ borderRadius: '10px' }}
                        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Statistic
                            value={1203}
                            prefix={<UserOutlined />}
                            valueStyle={{ fontSize: '24px', color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        title="Total Properties"
                        bordered={false}
                        style={{ borderRadius: '10px' }}
                        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Statistic
                            value={342}
                            prefix={<HomeOutlined />}
                            valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        title="Revenue"
                        bordered={false}
                        style={{ borderRadius: '10px' }}
                        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Statistic
                            value={56789}
                            prefix={<DollarOutlined />}
                            valueStyle={{ fontSize: '24px', color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        title="Active Sessions"
                        bordered={false}
                        style={{ borderRadius: '10px' }}
                        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Statistic
                            value={89}
                            prefix={<BarChartOutlined />}
                            valueStyle={{ fontSize: '24px', color: '#faad14' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Card
                        title="User Activity"
                        bordered={false}
                        style={{ borderRadius: '10px', height: '300px' }}
                    >
                        <p style={{ textAlign: 'center', marginTop: '50%' }}>User Activity Chart Placeholder</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                    <Card
                        title="Revenue Trends"
                        bordered={false}
                        style={{ borderRadius: '10px', height: '300px' }}
                    >
                        <p style={{ textAlign: 'center', marginTop: '50%' }}>Revenue Trends Chart Placeholder</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
