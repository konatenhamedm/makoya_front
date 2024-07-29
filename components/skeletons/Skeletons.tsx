"use client";
import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

export default function Skeletons({ number }) {
  return (
    <>
      {Array(number)
        .fill(0)
        .map((el, index) => (
          <div key={index}>
            <Card className="w-full h-full p-1 " radius="lg">
              <Skeleton>
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
            </Card>
          </div>
        ))}
    </>
  );
}
