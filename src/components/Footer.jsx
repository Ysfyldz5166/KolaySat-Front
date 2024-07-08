/* eslint-disable react/no-unknown-property */
import "./footer.css";
export function Footer() {
  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>İletişim</h5>
            <p>Telefon: 123-456-7890</p>
            <p>Email: info@example.com</p>
            <p>Adres: Örnek Sokak, Örnek Mahalle, Örnek Şehir</p>
          </div>
          <div className="col-md-4">
            <h5>Hakkımızda</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum at eros vitae nisl porttitor varius.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Konum</h5>
            <p className="maps">
              <iframe
                title="Google Harita"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195885.0534582796!2d32.597955357369045!3d39.90325990332506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sAnkara!5e0!3m2!1str!2str!4v1715153991787!5m2!1str!2str"
                width="400"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
