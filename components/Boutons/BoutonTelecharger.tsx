"use client";
import Image from "next/image";
import React from "react";

function BoutonTelecharger() {
  return (
    <div
      className="ptss__toggle-btn js-ptss-toggle-btn rote bg-[#0076d7] rounded-r-lg rounded-l-lg cursor-pointer transition"
      onClick={() => alert("ddd")}
    >
      <table width="100%" border={0}>
        <tbody>
          <tr>
            <td valign="middle">
              <Image
                src="/assets/download.png"
                alt="mail"
                width="25"
                height="25"
              />
            </td>

            <td valign="middle">&nbsp;</td>
            <td valign="middle">
              <span>Télécharger application</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BoutonTelecharger;
