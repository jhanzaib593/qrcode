import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  Button,
  Slider,
  Row,
  Col,
  Typography,
  Divider,
  Select,
} from "antd";
import { SketchPicker } from "react-color";
import "antd/dist/reset.css"; // Import AntD styles
import QRCodeStyling from "styled-qr-code";

const { Title } = Typography;
const { Option } = Select;

function QRCodeGenerator() {
  const [text, setText] = useState("https://yourwebsite.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000"); // Foreground color
  const [bgColor, setBgColor] = useState("#ffffff"); // Background color
  const [borderRadius, setBorderRadius] = useState(0); // Border radius for corners
  const [borderWidth, setBorderWidth] = useState(0); // Border width around QR code
  const [showFgColorPicker, setShowFgColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [styleType, setStyleType] = useState("square"); // Default QR style

  const qrRef = useRef();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const handleFgColorChange = (color) => {
    setFgColor(color.hex);
    setShowFgColorPicker(false);
  };

  const handleBgColorChange = (color) => {
    setBgColor(color.hex);
    setShowBgColorPicker(false);
  };

  const handleBorderRadiusChange = (value) => {
    setBorderRadius(value);
  };

  const handleBorderWidthChange = (value) => {
    setBorderWidth(value);
  };

  const handleStyleChange = (value) => {
    setStyleType(value);
  };

  const qrCode = new QRCodeStyling({
    width: size,
    height: size,
    data: text,
    dotsOptions: {
      color: fgColor,
      type: styleType.includes("dots") ? "dots" : styleType, // Handle dot styles
    },
    backgroundOptions: {
      color: bgColor,
    },
    cornersSquareOptions: {
      type: styleType.includes("rounded") ? "rounded" : styleType, // Handle rounded styles
    },
    cornersDotOptions: {
      type: styleType.includes("extra-rounded") ? "extra-rounded" : "dot", // Handle extra-rounded corners
    },
  });

  useEffect(() => {
    qrCode.append(qrRef.current);
    return () => {
      qrRef.current.innerHTML = "";
    };
  }, [text, size, fgColor, bgColor, styleType]);

  const downloadSVG = () => {
    qrCode.download({ extension: "svg" });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "white",
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        QR Code Generator
      </Title>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text or URL"
          />
        </Col>

        <Col span={24}>
          <Title level={5}>Size: {size}px</Title>
          <Slider
            min={100}
            max={500}
            value={size}
            onChange={handleSizeChange}
          />
        </Col>

        <Col span={24}>
          <Title level={5}>QR Code Style</Title>
          <Select
            value={styleType}
            onChange={handleStyleChange}
            style={{ width: "100%" }}
          >
            {/* 25 Style Options */}
            <Option value="square">Square</Option>
            <Option value="dots">Dots</Option>
            <Option value="rounded">Rounded</Option>
            <Option value="extra-rounded">Extra Rounded</Option>
            <Option value="classy">Classy</Option>
            <Option value="classy-rounded">Classy Rounded</Option>
            <Option value="dot-square">Dot Square</Option>
            <Option value="dot-rounded">Dot Rounded</Option>
            <Option value="dot-classy">Dot Classy</Option>
            <Option value="dot-classy-rounded">Dot Classy Rounded</Option>
            <Option value="circle">Circle</Option>
            <Option value="circle-square">Circle Square</Option>
            <Option value="circle-rounded">Circle Rounded</Option>
            <Option value="circle-classy">Circle Classy</Option>
            <Option value="circle-classy-rounded">Circle Classy Rounded</Option>
            <Option value="triangle">Triangle</Option>
            <Option value="triangle-square">Triangle Square</Option>
            <Option value="triangle-rounded">Triangle Rounded</Option>
            <Option value="triangle-classy">Triangle Classy</Option>
            <Option value="triangle-classy-rounded">
              Triangle Classy Rounded
            </Option>
            <Option value="diamond">Diamond</Option>
            <Option value="diamond-square">Diamond Square</Option>
            <Option value="diamond-rounded">Diamond Rounded</Option>
            <Option value="diamond-classy">Diamond Classy</Option>
          </Select>
        </Col>

        <Col span={12}>
          <Title level={5}>Foreground Color</Title>
          <Button
            style={{ backgroundColor: fgColor, color: "#fff" }}
            onClick={() => setShowFgColorPicker(!showFgColorPicker)}
          >
            {showFgColorPicker ? "Close Picker" : "Pick Color"}
          </Button>
          {showFgColorPicker && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <SketchPicker
                color={fgColor}
                onChangeComplete={handleFgColorChange}
              />
            </div>
          )}
        </Col>

        <Col span={12}>
          <Title level={5}>Background Color</Title>
          <Button
            style={{ backgroundColor: bgColor, color: "#fff" }}
            onClick={() => setShowBgColorPicker(!showBgColorPicker)}
          >
            {showBgColorPicker ? "Close Picker" : "Pick Color"}
          </Button>
          {showBgColorPicker && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <SketchPicker
                color={bgColor}
                onChangeComplete={handleBgColorChange}
              />
            </div>
          )}
        </Col>

        <Col span={12}>
          <Title level={5}>Border Radius</Title>
          <Slider
            min={0}
            max={20}
            value={borderRadius}
            onChange={handleBorderRadiusChange}
          />
        </Col>

        <Col span={12}>
          <Title level={5}>Border Width</Title>
          <Slider
            min={0}
            max={20}
            value={borderWidth}
            onChange={handleBorderWidthChange}
          />
        </Col>

        <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
          <Divider />
          <div
            ref={qrRef}
            style={{
              display: "inline-block",
              borderRadius: `${borderRadius}px`,
              border: `${borderWidth}px solid ${fgColor}`,
              padding: `${borderWidth}px`,
            }}
          />
        </Col>

        <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" onClick={downloadSVG}>
            Download as SVG
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default QRCodeGenerator;
