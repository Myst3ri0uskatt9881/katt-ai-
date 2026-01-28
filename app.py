from flask import Flask, render_template, request, session
from openai import OpenAI

app = Flask(__name__)
app.secret_key = "replace-this-with-something-real"

client = OpenAI()

@app.route("/", methods=["GET", "POST"])
def index():
    if "messages" not in session:
        session["messages"] = [
            {"role": "system", "content": "You are a helpful AI assistant."}
        ]

    if request.method == "POST":
        user_input = request.form["message"]
        session["messages"].append({"role": "user", "content": user_input})

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=session["messages"]
        )

        bot_reply = response.choices[0].message.content
        session["messages"].append({"role": "assistant", "content": bot_reply})

        session.modified = True

    return render_template("index.html", messages=session["messages"])

if __name__ == "__main__":
    app.run(debug=True)
