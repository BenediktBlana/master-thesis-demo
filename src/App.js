import { useEffect, useState } from "react";
import { Col, Container, Navbar, Row, Alert } from "react-bootstrap";

import "./assets/css/bootstrap.min.css";
import Header from "./components/Header";
import mqttClient from "./config/mqtt";

import layingGif from "./assets/laying.gif";
import sittingGif from "./assets/sitting.gif";
import standingGif from "./assets/standing.gif";
import walkingGif from "./assets/walking.gif";
import runningGif from "./assets/running.gif";

function App() {
  const routingKey = "prediction";
  const [messages, setMessage] = useState("waiting for message...");
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    mqttClient.on("connect", function () {
      setIsConnected(true);
      console.log("connected");
    });

    mqttClient.subscribe(routingKey, function () {
      console.log("subscribed to ", routingKey);
    });

    mqttClient.on("message", function (topic, message) {
      if (topic === routingKey) {
        console.log("Received '" + message + "' on '" + topic + "'");
        // const json = JSON.parse(message.toString());
        setMessage(message.toString());
        console.log(message.toString());
      }
    });
  }, []);

  function ActivityDisplay({ activity }) {
    console.log(activity);
    switch (activity) {
      case "SITTING":
        return (
          <>
            <h1 className="text-center">{activity}</h1>
            <img className="text-center" src={sittingGif} alt="my-gif" />;
          </>
        );
      case "STANDING":
        return (
          <>
            <h1 className="text-center">{activity}</h1>
            <img className="text-center" src={standingGif} alt="my-gif" />;
          </>
        );
      case "LAYING":
        return (
          <>
            <h1 className="text-center">{activity}</h1>
            <img className="text-center" src={layingGif} alt="my-gif" />;
          </>
        );
      case "WALKING":
        return (
          <>
            <h1 className="text-center">{activity}</h1>
            <img className="text-center" src={walkingGif} alt="my-gif" />;
          </>
        );
      case "RUNNING":
        return (
          <>
            <h1 className="text-center">{activity}</h1>
            <img className="text-center" src={runningGif} alt="my-gif" />;
          </>
        );
      default:
        return <h1>Unknown Activity</h1>;
    }
  }

  return (
    <>
      <Header />
      <main className="mt-3">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Alert variant={isConnected ? "success" : "danger"}>
                <Alert.Heading>
                  MQTT is {isConnected ? "connected" : "not connected"}
                </Alert.Heading>
              </Alert>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={12} className="text-center">
              <h2>Predicted activity:</h2>
            </Col>
            <Col lg={12} className="text-center">
              <ActivityDisplay activity={messages} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
