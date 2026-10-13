# Security Policy

## Reporting a vulnerability

Please report security issues privately to **support@tracepass.eu** rather than
opening a public issue. Include enough detail to reproduce: a minimal input or script
is ideal.

You should get an acknowledgement within **3 working days**. Please allow reasonable
time for a fix before public disclosure; we will tell you when a fix ships and credit
you unless you would rather stay anonymous.

## Supported versions

Only the **latest published version** of the TracePass DPP verifiable-credential profile (contexts, schemas and examples) receives security fixes. Upgrades are
free; older versions are not patched.

## Scope

**In scope:** anything in this repository: a JSON-LD context or schema that would let a consumer accept a malformed or forged credential, or a vulnerability in the generation and validation scripts.

**Out of scope:** the hosted TracePass platform and API. Report issues there to the
same address; they are not fixed by a release of this repository.
