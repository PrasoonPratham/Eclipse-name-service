use anchor_lang::prelude::*;

declare_id!("2HuooUmu5F4aSFtCFGcyjRnY2BAir91WY84RrqPXEyNW"); // Replace with your program ID

#[program]
pub mod solana_name_service {
    use super::*;
    pub fn create_name(ctx: Context<CreateName>, name: String) -> Result<()> {
        let name_account = &mut ctx.accounts.name_account;
        name_account.name = name;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateName<'info> {
    #[account(init, payer = user, space = 8 + 40)]
    pub name_account: Account<'info, NameAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct NameAccount {
    pub name: String,
}
