import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const Span = styled.span`
    color: #eaeaea;
    font-family: 'Roboto', sans-serif;
`
function Section({title, text, symbol}) {
    return (
        <Row style={{ marginBottom: '1rem'}}>
            <Col xs={{ size: '6'}}
                    md={{ size: '6'}}>
                <Span>{title}</Span>
            </Col>
            <Col xs={{ size: '6'}}
                    md={{ size: '6'}}
                    style={{textAlign: 'right'}}>
                 <Span>{text} {symbol}</Span>
            </Col>
        </Row>
    )
}
export default Section;
