import React, { useState } from 'react'
import { Anchor, Typography, Affix, Button } from 'antd'
import { DoubleLeftOutlined, DoubleRightOutlined,LeftOutlined,RightOutlined } from '@ant-design/icons'

import Chapter from '../../components/Knowledge'
import './index.less'





const chapters = [
    {
        part: "0",
        title: <Typography.Text strong>综述部分</Typography.Text>,
        href: '#',
        children: [
            {
                title: '第1章 基本面量化投资综述',
                href: '0-0',
                part: "0-0"
            }
        ],
    }, {
        part: "1",
        title: <Typography.Text strong>第一部分 财务分析基础</Typography.Text>,
        href: '#',
        children: [
            {
                title: '第2章 快速理解财务报表',
                href: '1-0',
                part: "1-0",
            }, {
                title: '第3章 个股分析应用',
                href: '1-1',
                part: "1-1",
            }
        ]
    }, {
        part: "2",
        title: <Typography.Text strong>第二部分 基于财务分析的量化投资</Typography.Text>,
        href: '#',
        children: [
            {
                title: '第4章 打开量化投资的黑匣子',
                href: '2-0',
                part: "2-0",
            }, {
                title: '第5章 估值维度',
                href: '2-1',
                part: "2-1",
            }, {
                title: '第6章 质量维度一：盈利能力',
                href: '2-2',
                part: "2-2",

            }, {
                title: '第7章 质量维度二：经营效率',
                href: '2-3',
                part: "2-3",
            }, {
                title: '第8章 质量维度三：盈余质量',
                href: '2-4',
                part: "2-4",
            }, {
                title: '第9章 质量维度四：投融资决策',
                href: '2-5',
                part: "2-5",
            }, {
                title: '第10章 质量维度五：无形资产',
                href: '2-6',
                part: "2-6",
            }, {
                title: '第11章 整合框架：现代价值投资理念',
                href: '2-7',
                part: "2-7",
            }
        ]
    }, {
        part: "3",
        title: <Typography.Text strong>第三部分 利用市场信号修正策略</Typography.Text>,
        href: '#',
        children: [
            {
                title: '第12章 市场参与者信号',
                href: '3-0',
                part: '3-0'
            }, {
                title: '第13章 市场价格信号',
                href: '3-1',
                part: '3-1'
            }, {
                title: '第14章 市场情绪信号',
                href: '3-2',
                part: '3-2'
            }
        ]
    }, {
        part: "4",
        title: <Typography.Text strong>第四部分 量化投资实践</Typography.Text>,
        href: '#',
        children: [
            {
                title: '第15章 量化投资组合：实施与管理',
                href: '4-0',
                part: '4-0'
            }, {
                title: '第16章 多因子选股模型',
                href: '4-1',
                part: '4-1'
            }
        ]
    }
]

const chaptersChildren = chapters.reduce((children,o)=>children.concat(o.children),[])


const Knowledge = () => {
    const [collapse, setCollapse] = useState(false)
    const [link, setLink] = useState({
        title: '第1章 基本面量化投资综述',
        href: '0-0',
        part: "0-0"
    })

    const toLastChapter = ()=>{
        let currentIndex = chaptersChildren.findIndex(child => child.href === link.href)
        const lastIndex = (currentIndex - 1) < 0 ? chaptersChildren.length - 1 : currentIndex - 1
        setLink(chaptersChildren[lastIndex])
    }
    const toNextChapter = ()=>{
        let currentIndex = chaptersChildren.findIndex(child => child.href === link.href)        
        const nextIndex = (currentIndex + 1) > chaptersChildren.length - 1 ? 0 : currentIndex + 1
        setLink(chaptersChildren[nextIndex])
    }

    return (
        <div id='knowledge-page'>
            <div className={collapse ? 'knowledge-chapter-transition' : 'knowledge-chapter'}>
                <div className='chapter-wrapper'>
                <LeftOutlined id='last-chapter' 
                    onClick={toLastChapter}
                    />
                <Chapter collapse={collapse} link={link} />
                <RightOutlined id={collapse? 'next-chapter-collapse':'next-chapter'}
                    onClick={toNextChapter}
                    />
                </div>
            </div>

            <div className={collapse ? 'knowledge-toc-transition' : 'knowledge-toc'}>
                <Affix className='toc-button'>
                    <Button onClick={() => setCollapse(!collapse)}
                        style={{ width: 25, height: 55, padding: '5px 5px 5px 3px' }}
                        type="primary"
                    >
                        <span style={{ writingMode: 'vertical-lr', fontSize: 15 }}>
                            目录 {collapse ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
                        </span>
                    </Button>
                </Affix>

                <Anchor className='toc-anchor'
                    key={link.href}
                    getCurrentAnchor={() => link.href}
                    onClick={(e, linkObj) => {
                        e.preventDefault()
                        setLink(linkObj)
                    }}
                    getContainer={() => document.getElementById('knowledge-page')}>
                    <Typography.Title level={4} style={{ textAlign: 'center', paddingTop: 30 }}>基本面量化投资</Typography.Title>
                    {
                        chapters.map(item => {
                            return item.children ?
                                (<Anchor.Link href={item.href} title={item.title} key={item.part}>
                                    {item.children.map(child => {
                                        return <Anchor.Link href={child.href} title={child.title} key={child.part} />
                                    })}
                                </Anchor.Link>) :
                                (<Anchor.Link href={item.href} title={item.title} key={item.part} />)
                        })
                    }
                </Anchor>

            </div>
        </div>
    )
}

export default Knowledge